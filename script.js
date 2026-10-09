
const $ = (selector) => document.querySelector(selector);

const KEYS = {
  progress: "touchgrass-fresh-progress",
  journal: "touchgrass-fresh-journal"
};

function load(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

let progress = load(KEYS.progress, {
  points: 0,
  minutes: 0,
  completed: [],
  missions: []
});

let journal = load(KEYS.journal, []);
let currentAdventure = null;
let generating = false;

if (!progress || typeof progress !== "object") {
  progress = { points: 0, minutes: 0, completed: [], missions: [] };
}

progress.points = Number(progress.points) || 0;
progress.minutes = Number(progress.minutes) || 0;

if (!Array.isArray(progress.completed)) progress.completed = [];
if (!Array.isArray(progress.missions)) progress.missions = [];
if (!Array.isArray(journal)) journal = [];

function updateDashboard() {
  $("#total-minutes").textContent = progress.minutes;
  $("#total-points").textContent = progress.points;
  $("#total-completed").textContent =
    progress.completed.length + progress.missions.length;

  document.querySelectorAll(".challenge button").forEach((button) => {
    const done = progress.completed.includes(button.dataset.id);
    button.disabled = done;
    button.textContent = done
      ? "✓ Completed"
      : `Earn ${button.dataset.points} points`;
  });

  $("#complete-adventure").disabled =
    !currentAdventure ||
    progress.missions.includes(currentAdventure.id);

  $("#complete-adventure").textContent =
    currentAdventure && progress.missions.includes(currentAdventure.id)
      ? "✓ Adventure completed"
      : "I completed my adventure ✓";
}

function persistProgress() {
  if (!save(KEYS.progress, progress)) {
    $("#message").textContent =
      "Could not save progress. Check your browser storage.";
  }
  updateDashboard();
}

// Ask the locally running Ollama model for an adventure.
$("#activity-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  if (generating) return;

  generating = true;
  $("#generate").disabled = true;
  $("#generate").textContent = "🌿 Creating your adventure...";
  $("#message").textContent = "";
  $("#empty-state").hidden = true;
  $("#adventure").hidden = false;
  $("#adventure-title").textContent = "Planning your adventure...";
  $("#adventure-description").textContent = "Your local AI is thinking.";
  $("#adventure-steps").replaceChildren();
  $("#adventure-safety").textContent = "";
  $("#complete-adventure").disabled = true;

  const mood = $("#mood").value;
  const minutes = Number($("#time").value);
  const location = $("#location").value;
  const interest = $("#interest").value;

  try {
    const response = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "qwen3:4b",
        stream: false,
        format: "json",
        messages: [
          {
            role: "system",
            content: `You are TouchGrass AI, an outdoor activity assistant.
Return a valid JSON object only, using this schema:
{
  "title": "Short title",
  "description": "Short description",
  "steps": ["Step 1", "Step 2", "Step 3"],
  "safety": "Practical safety reminder"
}
Give 3 to 5 useful steps. Fit the activity within the available
time. Suggest realistic and accessible outdoor activities.
Never encourage trespassing, eating unknown plants, disturbing
wildlife, or entering unsafe places. Do not require purchases.
Keep advice friendly and concise.`
          },
          {
            role: "user",
            content: `Mood: ${mood}.
Available time: ${minutes} minutes.
Location: ${location}.
Interest: ${interest}.
Create one suitable outdoor adventure.`
          }
        ],
        options: { temperature: 0.7 }
      })
    });

    if (!response.ok) {
      throw new Error(`Ollama returned HTTP ${response.status}.`);
    }

    const data = await response.json();
    const result = JSON.parse(data.message.content);

    if (
      typeof result.title !== "string" ||
      typeof result.description !== "string" ||
      !Array.isArray(result.steps) ||
      result.steps.length < 3 ||
      result.steps.some((step) => typeof step !== "string")
    ) {
      throw new Error("The model returned an incomplete adventure.");
    }

    currentAdventure = {
      id: crypto.randomUUID(),
      title: result.title.slice(0, 150),
      description: result.description.slice(0, 700),
      steps: result.steps.slice(0, 5).map((step) => step.slice(0, 300)),
      safety: typeof result.safety === "string"
        ? result.safety.slice(0, 300)
        : "Choose a safe place and respect nature.",
      minutes,
      points: minutes
    };

    renderAdventure(currentAdventure);
  } catch (error) {
    console.error(error);
    currentAdventure = null;
    $("#adventure").hidden = true;
    $("#empty-state").hidden = false;
    $("#message").textContent =
      "AI connection failed. Make sure Ollama is running, qwen3:4b " +
      "is installed, and browser access is allowed. " + error.message;
  } finally {
    generating = false;
    $("#generate").disabled = false;
    $("#generate").textContent = "✨ Create my adventure";
    updateDashboard();
  }
});

function renderAdventure(adventure) {
  $("#adventure-title").textContent = adventure.title;
  $("#adventure-description").textContent = adventure.description;

  const list = $("#adventure-steps");
  list.replaceChildren();

  adventure.steps.forEach((step) => {
    const item = document.createElement("li");
    item.textContent = step;
    list.appendChild(item);
  });

  $("#adventure-time").textContent = `⏱ ${adventure.minutes} minutes`;
  $("#adventure-safety").textContent =
    "Safety first: " + adventure.safety;

  $("#message").textContent = "";
  updateDashboard();
}

$("#complete-adventure").addEventListener("click", () => {
  if (!currentAdventure) return;
  if (progress.missions.includes(currentAdventure.id)) return;

  if (!confirm("Have you completed this adventure outdoors?")) return;

  progress.missions.push(currentAdventure.id);
  progress.points += currentAdventure.points;
  progress.minutes += currentAdventure.minutes;

  persistProgress();
  $("#message").textContent = "🌿 Wonderful! Your points have been added.";
});

// Record a challenge only after the user confirms completion.
document.querySelectorAll(".challenge button").forEach((button) => {
  button.addEventListener("click", () => {
    const id = button.dataset.id;
    if (progress.completed.includes(id)) return;

    if (!confirm("Did you complete this activity outdoors?")) return;

    progress.completed.push(id);
    progress.points += Number(button.dataset.points);
    progress.minutes += Number(button.dataset.minutes);

    persistProgress();
    $("#message").textContent = "🌱 Challenge complete! Points earned.";
  });
});

// Nature journal.
$("#journal-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const title = $("#entry-title").value.trim();
  const notes = $("#entry-notes").value.trim();

  if (!title) return;

  const entry = {
    id: crypto.randomUUID(),
    title: title.slice(0, 100),
    notes: notes.slice(0, 1000),
    date: new Date().toLocaleDateString()
  };

  journal.unshift(entry);

  if (!save(KEYS.journal, journal)) {
    journal.shift();
    alert("Unable to save. Your browser storage may be full.");
    return;
  }

  renderJournal();
  $("#journal-form").reset();
});

function renderJournal() {
  const container = $("#journal-entries");
  container.replaceChildren();

  if (journal.length === 0) {
    const empty = document.createElement("p");
    empty.className = "muted";
    empty.textContent = "Your outdoor memories will appear here.";
    container.appendChild(empty);
    return;
  }

  journal.forEach((entry) => {
    const article = document.createElement("article");
    article.className = "journal-entry";

    const heading = document.createElement("h3");
    heading.textContent = "🌿 " + entry.title;

    const notes = document.createElement("p");
    notes.textContent = entry.notes || "No notes added.";

    const date = document.createElement("small");
    date.textContent = entry.date;

    const remove = document.createElement("button");
    remove.className = "delete-entry";
    remove.type = "button";
    remove.textContent = "Delete memory";

    remove.addEventListener("click", () => {
      if (!confirm("Delete this memory?")) return;

      const previous = journal;
      journal = journal.filter((item) => item.id !== entry.id);

      if (!save(KEYS.journal, journal)) {
        journal = previous;
        alert("Could not save the updated journal.");
      }

      renderJournal();
    });

    article.append(heading, notes, date, remove);
    container.appendChild(article);
  });
}

updateDashboard();
renderJournal();