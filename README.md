# 🧮 Causal formula app

A lightweight React application that allows users to perform mathematical operations with dynamic **tags** — similar to the behavior of Causal. The app supports autocomplete suggestions and evaluates expressions using tag values, powered by [mathjs](https://mathjs.org/).

## ✨ Features

* Dynamic autocomplete for tags via API
* Real-time evaluation of mathematical formulas
* Tag-based expression building
* Type-safe React with Zustand state management
* Beautifully styled with Tailwind CSS
* Attached dropdowns on each tag for interaction

## 🔧 Tech Stack

* **React 19**
* **TypeScript**
* **Vite**
* **Tailwind CSS**
* **Zustand** (for state management)
* **mathjs** (for expression evaluation)
* **React Query** (for fetching autocomplete data)
* **Radix UI** (for dropdown and popover components)

## 📦 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/causal-formula-app.git
cd causal-formula-app
npm install
```

Start the development server:

```bash
npm run dev
```

## 🌐 API Integration

The app fetches autocomplete suggestions from a mock API and filters them based on the current query:

```ts
const res = await fetch('https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete')
```

Only matching results based on the tag name are shown as suggestions.

## 🖼️ Screenshots

<p align="center">  
  <img src="screenshots/autocomplete.png" alt="Autocomplete Demo" width="500" />  
  <img src="screenshots/evaluation.png" alt="Formula Evaluation Demo" width="500" />  
</p>

## 🚀 Scripts

| Script            | Description                   |
| ----------------- | ----------------------------- |
| `npm run dev`     | Starts the dev server         |
| `npm run build`   | Builds the app for production |
| `npm run preview` | Serves the production build   |
| `npm run lint`    | Lints the code using ESLint   |

## 📁 Folder Structure

```
src/
├── components/         # Reusable UI components
├── hooks/              # Custom React hooks
├── store/              # Zustand state logic
├── utils/              # Utility functions
└── App.tsx             # Main entry component
```

## 🙋‍♀️ Author

Built by [Sona Hakobyan](https://github.com/iiamsona) 💡
For inquiries, contact: [sona22hakobyan@gmail.com](mailto:sona22hakobyan@gmail.com)

---

## 📋 About This Project

This app is my implementation of the formula input functionality inspired by [causal.app](https://causal.app), where users can:

* Build mathematical expressions using **tags** representing variables or values
* Use operands (`+`, `-`, `*`, `/`, `^`, `(`, `)`, etc.) and natural numbers within expressions
* Write freely between tags and delete tags with backspace
* Receive autocomplete suggestions powered by React Query from a remote API
* Interact with each tag via an attached dropdown on the right side
* See real-time formula evaluation (bonus feature) with dummy variable values

I managed local state using Zustand and API state with React Query. The focus was on functionality to match Causal’s formula input behavior with a nice user experience.

---

## 🔗 Live Demo

Check out the hosted version here:
[https://causal-formula-app-6sh7-git-main-iiamsonas-projects.vercel.app](https://causal-formula-app-6sh7-git-main-iiamsonas-projects.vercel.app)

