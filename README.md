<img src="/src/assets/boiler.svg" alt="Project Banner Image">

# Vite + React + Zustand — Technigo Boilerplate

Welcome! This project is a starter template for building React apps with **Zustand** for state management. It comes with working examples so you can learn by reading real code before writing your own.

👉 [Live Demo](https://react-vite-zustand-boiler-plate.netlify.app/)

---

## Getting Started

```bash
# 1. Clone the repo
git clone <your-repo-url>

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Your app will be running at `http://localhost:5173`.

---

## Project Structure

```
src/
├── App.jsx                          ← Main entry point, routing lives here
├── components/
│   ├── Logos.jsx
│   ├── ComponentWithStore.jsx       ← Example: reads & updates Zustand state
│   ├── ComponentWithStoreTwo.jsx
│   └── ComponentWithstoreThree.jsx
├── pages/                           ← One file per page/route
│   └── About.jsx                    ← Example page
└── stores/
    ├── useStore.jsx                  ← Main shared store
    └── aboutStore.js                 ← Store specific to the About page
```

> **New to this?** Think of `stores/` as a shared notepad your components can all read from and write to — without having to pass data through props.

---

## What is Zustand?

Zustand is a lightweight library for **state management** — a way to share data between components without prop drilling.

```js
// Define a store
const useStore = create((set) => ({
  username: "Alex",
  setUsername: (name) => set({ username: name }),
}));

// Use it in any component
const { username, setUsername } = useStore();
```

That's it. No boilerplate, no context providers, no reducers.

---

## What's Already in the Project

### `ComponentWithStore`
A working example showing how to read and update state. It lets you:
- Toggle login status
- Increment age
- Update username
- Add hobbies
- Change address
- Set a favourite sports team

### `useStore.jsx`
The main Zustand store. It holds all the state used by the example components. Open it to understand the pattern before creating your own store.

> **Tip:** Before deleting the example components, read through them — they show exactly how the patterns work. Use them as a blueprint.

---

## Adding a New Page

This project includes an **agent skill** that generates a new page for you automatically — component, store, CSS, and routing all included.

📄 **Skill file:** `src/skills/add-page/SKILL.md`

---


Happy coding! 🚀