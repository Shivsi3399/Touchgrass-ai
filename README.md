# 🌿 TouchGrass AI — Less Scrolling, More Living

**An AI-powered outdoor activity companion built with HTML, CSS, JavaScript, and open-weight AI.**

TouchGrass AI helps people spend less time on screens and more time exploring the real world. It uses a locally running AI model to generate personalized outdoor activities based on a user's mood, available time, interests, and surroundings.

Instead of encouraging users to stay online, TouchGrass AI uses technology to inspire real-world experiences, from mindful walks and nature exploration to gardening and outdoor photography.

> **Project theme:** Touch Grass — Build something with open-source AI that gets people off the screen and into the world.

---

## 📌 Table of Contents

* [About the Project](#-about-the-project)
* [Problem Statement](#-problem-statement)
* [Project Goals](#-project-goals)
* [Features](#-features)
* [Demo](#-demo)
* [Technology Stack](#-technology-stack)
* [How It Works](#-how-it-works)
* [Getting Started](#-getting-started)
* [Installation on macOS](#-installation-on-macos)
* [Running the Project](#-running-the-project)
* [Project Structure](#-project-structure)
* [AI Integration](#-ai-integration)
* [Open-Source Innovation](#-open-source-innovation)
* [Privacy and Data Storage](#-privacy-and-data-storage)
* [Troubleshooting](#-troubleshooting)
* [Limitations](#-limitations)
* [Future Improvements](#-future-improvements)
* [Contributing](#-contributing)
* [License](#-license)
* [Author](#-author)

---

## 🌱 About the Project

TouchGrass AI is a nature-focused web application that uses artificial intelligence to turn free time into meaningful outdoor experiences.

Users choose how they feel, how much time they have, where they can go, and what activities interest them. The application sends this information to a locally running open-weight language model, which generates an outdoor mission with actionable steps and a safety reminder.

The application also includes outdoor challenges, a points system, and a nature journal to help users reflect on their experiences.

### Our Philosophy

**Technology should help people experience the world, not replace it.**

TouchGrass AI uses AI as a starting point for offline activities. The screen helps users discover an adventure; the real experience happens outside.

---

## 🎯 Problem Statement

Excessive screen time can make it harder for people to prioritize outdoor recreation, physical movement, and time spent in nature.

People may want to go outside but struggle to decide what to do, especially when they have limited free time or no specific plan.

Traditional activity applications may rely on online services or cloud-based AI APIs. This can introduce recurring costs and require users to share personal information with external services.

TouchGrass AI addresses these challenges by providing:

* Personalized outdoor activity suggestions.
* Simple challenges that encourage real-world exploration.
* A lightweight interface built with standard web technologies.
* Local AI inference using an open-weight model.
* Browser-based storage for personal progress and journal entries.

---

## 🎯 Project Goals

1. Encourage users to spend more time outdoors.
2. Use AI to generate personalized, practical activities.
3. Demonstrate how open-weight AI can be integrated into a web application.
4. Reduce dependence on paid, hosted AI APIs.
5. Keep activity preferences and journal entries local to the user's device in the default setup.
6. Make outdoor activities accessible, simple, and enjoyable.
7. Build an application using HTML, CSS, and JavaScript without requiring a frontend framework.

---

## ✨ Features

### 1. 🤖 AI-Powered Adventure Generator

Generate personalized outdoor activities using a locally running language model.

Users can select:

* **Mood:** Bored, stressed, energetic, curious, or peaceful.
* **Available time:** 15, 30, 45, or 60 minutes.
* **Outdoor location:** Local park, neighborhood, garden or balcony, or nature trail.
* **Interest:** Nature exploration, walking, bird observation, gardening, mindfulness, or photography.

The AI returns a mission containing:

* An activity title.
* A short description.
* Three to five actionable steps.
* A practical safety reminder.

The suggestions are designed to fit the selected time and available environment.

### 2. 🌳 Outdoor Challenges

The application includes predefined outdoor challenges.

| Challenge          | Suggested duration | Points |
| ------------------ | -----------------: | -----: |
| Leaf Detective     |         10 minutes |     10 |
| Mindful Wander     |         15 minutes |     15 |
| Sound Explorer     |         10 minutes |     10 |
| Plant a Little Joy |         20 minutes |     20 |

Users can mark a challenge complete after performing it. Each predefined challenge can be claimed once in the saved browser profile.

### 3. 🏆 Points and Progress Tracking

The dashboard displays:

* Total outdoor minutes recorded.
* Nature points earned.
* Number of activities completed.

Completing a generated adventure or predefined challenge updates the dashboard.

The point system encourages participation, but the application does not independently verify activity completion.

### 4. 📔 Nature Journal

Users can record outdoor experiences and discoveries.

Journal entries contain:

* A title.
* Personal notes.
* The date the entry was created.
* An option to delete an entry.

Entries are stored in browser `localStorage`, so they remain available after refreshing the page in the same browser profile, provided the browser data is not cleared.

### 5. 🎨 Responsive User Interface

The application features:

* A nature-inspired color palette.
* Forest-green accents and cream backgrounds.
* Responsive activity cards.
* A simple navigation bar.
* Interactive forms and buttons.
* Layout adjustments for smaller screens.

### 6. 🔒 Local-First AI Architecture

The default development setup sends prompts to an Ollama instance running on the user's own computer.

This avoids the need for a paid cloud AI API key. However, the browser still loads Google Fonts from an external service when an internet connection is available, unless the stylesheet is modified to use local fonts.

---

## 🖥️ Demo

### Run It Locally

After completing the installation instructions, start the development server and open:

`http://localhost:8000`

The AI generator requires Ollama to be running and the configured model to be installed. The challenge tracker and journal can work independently of AI generation.

### Screenshots

You can add screenshots of your running application to your repository.

Suggested screenshot layout:

```text
screenshots/
├── homepage.png
├── ai-adventure.png
├── challenges.png
└── nature-journal.png
```

Once these images exist in your repository, add them to this README:

```markdown
## 📸 Screenshots

### Homepage
![TouchGrass AI Homepage](screenshots/homepage.png)

### AI Adventure Generator
![AI Adventure Generator](screenshots/ai-adventure.png)

### Outdoor Challenges
![Outdoor Challenges](screenshots/challenges.png)

### Nature Journal
![Nature Journal](screenshots/nature-journal.png)
```

Replace the image paths with your actual screenshot filenames if they differ.

---

## 🛠️ Technology Stack

| Technology           | Purpose                                                  |
| -------------------- | -------------------------------------------------------- |
| HTML5                | Page structure and semantic elements                     |
| CSS3                 | Styling, layout, responsive design, and animations       |
| JavaScript           | UI interactions, application logic, and state management |
| Ollama               | Local model runtime and API                              |
| Qwen3-4B             | Example open-weight language model                       |
| Fetch API            | Communication between the frontend and local AI service  |
| Browser localStorage | Saving progress and journal entries                      |
| Python HTTP server   | Serving the frontend during local development            |

### Why These Technologies?

HTML, CSS, and JavaScript keep the frontend lightweight and easy to understand. Ollama provides a straightforward interface for local model inference, while browser storage removes the need for a database for the current feature set.

---

## ⚙️ How It Works

The application follows a simple architecture.

```text
                  USER
                    |
                    v
           HTML + CSS Interface
                    |
                    v
             JavaScript Logic
                    |
                    v
        HTTP Request to Local Ollama
                    |
                    v
           Open-Weight AI Model
                 Qwen3-4B
                    |
                    v
          Generated JSON Response
                    |
                    v
          Display Outdoor Mission
                    |
                    v
          User Completes Activity
                    |
                    v
         Update Progress and Points
```

### Activity Generation Flow

1. The user selects their mood, time, location, and interest.
2. JavaScript creates a prompt containing these selections.
3. The browser sends a request to the Ollama chat API.
4. The configured model generates an outdoor activity in JSON format.
5. JavaScript parses and validates the response.
6. The activity is displayed on the webpage.
7. The user can complete the mission and update their progress.

### Local Storage Flow

The application uses two browser storage keys:

* `touchgrass-fresh-progress` — stores points, recorded minutes, and completed activities.
* `touchgrass-fresh-journal` — stores nature journal entries.

These values are stored in the browser, not in a central application database.

---

## 🚀 Getting Started

### Prerequisites

Before installing the project, make sure you have:

* A MacBook, Windows PC, or compatible computer.
* A modern web browser.
* Python 3 for the simple development server, or another static HTTP server.
* [Ollama](https://ollama.com/download) installed.
* Sufficient memory and processing resources to run your selected model.
* An internet connection for the initial software and model downloads.

The frontend can be developed without AI installed, but generating personalized missions requires the local model service.

---

## 🍎 Installation on macOS

### Step 1: Install Ollama

Download and install Ollama from:

https://ollama.com/download

Open Terminal and verify the installation:

```bash
ollama --version
```

### Step 2: Download the Model

Pull the Qwen3-4B model:

```bash
ollama pull qwen3:4b
```

This downloads the model files required for local inference. Download size, performance, and memory requirements depend on the model version and your system.

### Step 3: Verify the Model

Run:

```bash
ollama run qwen3:4b
```

Enter a test prompt, such as:

```text
Suggest a 15-minute outdoor nature activity.
```

If the model responds, the local AI runtime is working.

Exit the interactive session with:

```text
/bye
```

Keep the Ollama application or service running when you use the website.

### Step 4: Download or Clone the Project

If you have already created the project folder:

```bash
cd ~/Desktop/touchgrass-ai
```

Alternatively, clone your GitHub repository:

```bash
git clone https://github.com/YOUR-USERNAME/touchgrass-ai.git
cd touchgrass-ai
```

Replace `YOUR-USERNAME` with your GitHub username and use your actual repository name.

### Step 5: Verify the Files

Your project directory should contain:

```text
touchgrass-ai/
├── index.html
├── style.css
├── script.js
└── README.md
```

### Step 6: Start the Development Server

Run:

```bash
python3 -m http.server 8000
```

Open your browser and visit:

http://localhost:8000

Keep the Terminal window open while the server is running.

---

## 🔌 AI Integration

TouchGrass AI uses the Ollama chat endpoint:

```text
http://localhost:11434/api/chat
```

The JavaScript frontend sends an HTTP POST request containing the selected model, a system prompt, the user's activity preferences, and the JSON response format.

Example request body:

```json
{
  "model": "qwen3:4b",
  "stream": false,
  "format": "json",
  "messages": [
    {
      "role": "system",
      "content": "Create a safe and practical outdoor activity."
    },
    {
      "role": "user",
      "content": "I feel bored and have 15 minutes."
    }
  ]
}
```

The application reads the response from `message.content`, parses the JSON, and displays the generated mission.

### Change the Model

The model can be changed in `script.js`.

For example, if you download another compatible Ollama model, replace:

```javascript
model: "qwen3:4b"
```

with the model name you have installed.

The new model must support the expected chat API and return a response compatible with the application's JSON schema.

### About Open-Weight AI

Qwen3-4B is an example of an open-weight language model available under the Apache 2.0 license. Check the official model information and the license for the exact model version you use.

References:

* Ollama: https://ollama.com/
* Ollama API documentation: https://docs.ollama.com/api
* Qwen3 model information: https://huggingface.co/Qwen/Qwen3-4B
* Qwen documentation: https://qwen.readthedocs.io/

---

## 🌍 Open-Source Innovation

Open innovation is central to TouchGrass AI because it allows developers to experiment with AI without relying entirely on proprietary hosted AI services.

### 1. Local Inference

The model runs on the user's computer through Ollama. In the default local configuration, activity preferences can be processed without sending prompts to a third-party hosted model provider.

### 2. Greater Model Flexibility

The application is not designed around one proprietary AI API. Compatible models can be substituted, allowing developers to experiment with different models, inference settings, and prompt designs.

### 3. Lower Recurring API Costs

Local inference does not require a per-request hosted AI API fee. Hardware, electricity, software requirements, and the initial model download still have associated costs.

### 4. More Control Over AI Behavior

The system prompt can be modified to change the activities the model suggests, how the steps are presented, and the safety guidance included in its responses.

### 5. Offline Potential

Once the software and model are downloaded, local inference can work without an internet connection, provided Ollama and all required resources are available locally.

The current frontend imports Google Fonts externally. To make the complete interface more suitable for offline use, remove the Google Fonts import and use system fonts or bundle font files locally.

### 6. Open Development

Developers can inspect the frontend code, adapt the prompts, change the model, and add new features without depending on a proprietary application framework.

**The key idea:** use open AI to encourage offline experiences, not to keep people interacting with the application.

---

## 🔒 Privacy and Data Storage

The current implementation is designed around local use.

* Activity prompts are sent to the local Ollama endpoint.
* Journal entries are saved in browser `localStorage`.
* Challenge progress is saved in browser `localStorage`.
* The application does not include an application-owned cloud database or account system.

However, local storage is not encrypted and is not a secure vault. Anyone with access to the same browser profile may be able to view the saved data. Clearing browser storage may remove entries and progress.

The development server and Ollama API are intended for local development. Do not expose them publicly without appropriate security controls.

---

## 🧰 Troubleshooting

### Problem 1: `ollama: command not found`

**Possible cause:** Ollama is not installed correctly or is not available in your shell's PATH.

**Solution:**

1. Install Ollama from its official macOS download page.
2. Open the Ollama application.
3. Open a new Terminal window.
4. Run:

```bash
ollama --version
```

### Problem 2: The Website Opens but AI Generation Fails

**Possible causes:**

* Ollama is not running.
* The model has not been downloaded.
* The browser is blocked by cross-origin restrictions.
* The local API returned an error.

**Solution:**

Check the model:

```bash
ollama list
```

Start the model:

```bash
ollama run qwen3:4b
```

Check the local API:

```bash
curl http://localhost:11434/api/tags
```

If the API is available, it should return information about installed models.

### Problem 3: Browser CORS Error

The browser may block requests from the development server to Ollama.

For the local development origin, configure Ollama's permitted origins using the supported environment configuration for your installation.

For example, in macOS Terminal:

```bash
launchctl setenv OLLAMA_ORIGINS "http://localhost:8000"
```

Then completely quit and restart Ollama.

This command may not affect an already-running Ollama process. If requests still fail, check the current Ollama documentation:

https://docs.ollama.com/faq

Only allow trusted origins. Do not use broad cross-origin permissions as a production security solution.

### Problem 4: The Model Returns Invalid JSON

**Possible cause:** The model returned content that does not match the application's expected schema.

**Solution:**

* Confirm that the model supports structured JSON output.
* Keep the output schema explicit in the system prompt.
* Validate the response before displaying it.
* Retry generation if the model returns an incomplete response.

### Problem 5: The Model Runs Slowly

**Possible causes:**

* Limited available memory.
* Other applications consuming system resources.
* A model that is too large for the machine.
* Long prompts or large responses.

**Solution:**

Try a smaller compatible model, close unnecessary applications, and shorten the prompt.

### Problem 6: Journal Entries Disappear

**Possible causes:**

* Browser storage was cleared.
* The application is opened in a different browser profile.
* The website is being accessed from a different origin.
* Browser storage is unavailable or full.

**Solution:**

Use the same browser and development URL consistently. Remember that `localhost` and `127.0.0.1` can have different browser storage origins.

---

## ⚠️ Limitations

The current version is a local prototype rather than a production service.

* Outdoor activity completion is confirmed by the user; it is not independently verified.
* Points and progress are stored in browser storage and can be modified by the user.
* There is no user authentication, synchronization, or cloud backup.
* Activity suggestions depend on the model and the quality of the generated output.
* The application does not currently retrieve live weather, local park data, trail conditions, or real-time wildlife information.
* The browser requires the local AI endpoint to be available for mission generation.
* Public deployment requires a suitable backend or other secure inference architecture; a public website cannot assume every visitor has Ollama installed.

---

## 🚀 Future Improvements

The project can be expanded with the following features:

### AI and Nature

* **Bird-call identification:** Identify bird sounds using an appropriate open-source audio model.
* **Plant identification:** Explore plant recognition with an image model, with appropriate warnings about identification uncertainty.
* **Garden planner:** Recommend seasonal planting activities using suitable local climate and gardening data.
* **Weather-aware suggestions:** Recommend activities based on weather information.
* **Location-aware exploration:** Suggest nearby parks and nature trails using suitable map and geographic data sources.

### Gamification

* Daily and weekly outdoor streaks.
* Achievement badges.
* Custom missions.
* A personal outdoor activity calendar.
* Optional group challenges.

### Technical Improvements

* Progressive Web App support.
* Offline caching of the frontend.
* Local font assets for a fully offline interface.
* Automated tests.
* Improved accessibility.
* Optional export and backup of journal entries.
* A backend for securely hosted AI inference.
* A settings page for choosing compatible local models.

### Open-Source AI Experiments

* Compare multiple open-weight models.
* Experiment with different system prompts.
* Evaluate the quality and safety of generated activities.
* Explore lightweight models for lower-powered computers.
* Add suitable open-source vision and audio models.

---

## 🤝 Contributing

Contributions, ideas, bug reports, and improvements are welcome.

### How to Contribute

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Test the website and any affected AI functionality.
5. Commit your changes with a clear message.
6. Open a pull request describing your changes.

Example commands:

```bash
git checkout -b feature/new-outdoor-challenge
git add .
git commit -m "Add new outdoor challenge"
git push origin feature/new-outdoor-challenge
```

Please avoid including API credentials, personal journal entries, or unnecessary generated model files in commits.

---

## 📄 License

This project is intended to be shared and extended. Before publishing, add a repository-level license that reflects how you want others to use your code.

For example, the MIT License permits broad reuse of the project code when its terms are followed. If you choose MIT, add a `LICENSE` file containing the license text.

The project's code license does not automatically change the license of the AI model, its weights, fonts, or other third-party assets. Review their respective terms separately.

---

## 👨‍💻 Author

**Created by:** YOUR NAME

**Project:** TouchGrass AI

**Built with:** HTML · CSS · JavaScript · Ollama · Qwen3-4B

**Theme:** Touch Grass — Open-source AI for real-world experiences.

If you find this project interesting, consider starring the repository ⭐ and contributing an idea that helps people reconnect with nature.

---

### 🌿 Final Thought

> The best AI experience might be the one that helps you close your laptop, step outside, and experience something real.

**TouchGrass AI — Less scrolling. More living.**
