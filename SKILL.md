---
name: add-page
description: Use this skill whenever a new page or route needs to be added to the Technigo React Zustand boilerplate project. Triggers on requests like "create a new page", "add a /route", "make a new view", "add a page with state", or "add routing for X". The agent must follow this skill exactly — do not improvise file structure or naming.
---

# Add a New Page to the React Zustand Boilerplate

This skill guides an agent through safely adding a new page (route + component + optional store) to the Technigo `react-zustand-boiler-plate` project without breaking any existing functionality.

---

## Project Structure Reference

Before writing any code, understand the existing layout:

```
src/
├── App.jsx                          ← Routing lives here
├── components/
│   ├── Logos.jsx
│   ├── ComponentWithStore.jsx
│   ├── ComponentWithStoreTwo.jsx
│   └── ComponentWithstoreThree.jsx  ← Note lowercase 's' in 'store'
├── pages/                           ← Create this folder if it doesn't exist
│   └── About.jsx                    ← Example page
└── stores/
    ├── useStore.jsx                  ← Main existing store (named export)
    └── aboutStore.js                 ← Example page-specific store (default export)
```

Key facts the agent must know:
- The main store file is `useStore.jsx` (not `store.js`)
- `useStore` is a **named export**: `import { useStore } from "../stores/useStore"`
- Page-specific stores use **default exports**: `import useMyStore from "../stores/myStore"`
- `App.jsx` uses a **named export**: `export const App = () => { ... }`
- Routing uses `react-router-dom` (must already be installed: `npm install react-router-dom`)

---

## Inputs

The agent needs the following before starting:

| Placeholder     | Description                              | Example          |
|-----------------|------------------------------------------|------------------|
| `{{PageName}}`  | PascalCase name of the new page          | `Contact`        |
| `{{routePath}}` | URL path for the page (with leading `/`) | `/contact`       |
| `{{navLabel}}`  | Text shown in the nav link               | `Contact`        |
| `{{needsStore}}`| Does this page need its own Zustand store? `yes` or `no` | `yes` |
| `{{storeField}}`| (If yes) name of the state field         | `message`        |

---

## Pre-Flight Checks

Before writing any file, the agent **must** verify:

1. **`react-router-dom` is installed** — check `package.json` for `"react-router-dom"` in dependencies.
   - If missing: stop and output `RUN FIRST: npm install react-router-dom`
2. **`src/pages/` folder exists** — if not, it will be created when the page file is written.
3. **No file at `src/pages/{{PageName}}.jsx` already exists** — do not overwrite.
4. **No route for `{{routePath}}` already exists in `App.jsx`** — do not duplicate.
5. **`App.jsx` already uses `BrowserRouter` and `Routes`** — if it does not, apply the App.jsx migration template below before adding the route.

---

## Step-by-Step Instructions

### Step 1 — Create the store (only if `{{needsStore}}` is `yes`)

Create file: `src/stores/{{pageName}}Store.js`
(`{{pageName}}` = camelCase version of `{{PageName}}`, e.g. `Contact` → `contactStore.js`)

```js
// src/stores/{{pageName}}Store.js
import { create } from "zustand";

const use{{PageName}}Store = create((set) => ({
  {{storeField}}: "",
  set{{StoreField}}: (value) => set({ {{storeField}}: value }),
}));

export default use{{PageName}}Store;
```

> `{{StoreField}}` = PascalCase version of `{{storeField}}` (e.g. `message` → `Message`)

---

### Step 2 — Create the page component

Create file: `src/pages/{{PageName}}.jsx`

**Template A — with its own store AND reading username from the main store:**

```jsx
// src/pages/{{PageName}}.jsx
import use{{PageName}}Store from "../stores/{{pageName}}Store";
import { useStore } from "../stores/useStore";
import "./{{PageName}}.css";

const {{PageName}} = () => {
  const { {{storeField}}, set{{StoreField}} } = use{{PageName}}Store();
  const { username } = useStore();

  return (
    <div className="{{pageName}}-page">
      <h1>{{PageName}}</h1>
      <p>{username || "No username set"}</p>

      <textarea
        placeholder="Write here..."
        value={ {{storeField}} }
        onChange={(e) => set{{StoreField}}(e.target.value)}
      />

      { {{storeField}} && <p>{ {{storeField}} }</p> }
    </div>
  );
};

export default {{PageName}};
```

**Template B — no store, display only:**

```jsx
// src/pages/{{PageName}}.jsx
import { useStore } from "../stores/useStore";
import "./{{PageName}}.css";

const {{PageName}} = () => {
  const { username } = useStore();

  return (
    <div className="{{pageName}}-page">
      <h1>{{PageName}}</h1>
      <p>{username || "No username set"}</p>
    </div>
  );
};

export default {{PageName}};
```

> If the page does not need `username` either, remove both the import and the `<p>` line.

---

### Step 3 — Create the CSS file

Create file: `src/pages/{{PageName}}.css`

```css
/* src/pages/{{PageName}}.css */
.{{pageName}}-page {
  max-width: 480px;
  margin: 3rem auto;
  padding: 0 1rem;
  font-family: sans-serif;
}

.{{pageName}}-page h1 {
  margin-bottom: 1rem;
}

.{{pageName}}-page textarea {
  width: 100%;
  min-height: 100px;
  padding: 0.6rem;
  font-size: 0.95rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  resize: vertical;
  box-sizing: border-box;
}

.{{pageName}}-page p {
  margin-top: 1rem;
  font-size: 0.95rem;
  color: #444;
}
```

---

### Step 4 — Update `App.jsx`

This is the only existing file that must be modified. Make **three additive changes** only. Do not remove or reorder anything else.

The current `App.jsx` (with router already set up) looks like this:

```jsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// --- Original components ---
import { Logos } from "./components/Logos";
import { ComponentWithStore } from "./components/ComponentWithStore";
import { ComponentWithStoreTwo } from "./components/ComponentWithStoreTwo";
import { ComponentWithStoreThree } from "./components/ComponentWithstoreThree";

// --- Add new page imports here ---
import About from "./pages/About";

export const App = () => {
  return (
    <BrowserRouter>

      {/* --- Add new nav links here --- */}
      <nav style={{ padding: "0.5rem 1rem", borderBottom: "1px solid #eee" }}>
        <Link to="/" style={{ marginRight: "1rem" }}>Home</Link>
        <Link to="/about">About</Link>
      </nav>

      <Routes>

        {/* --- Home route: original content, do not remove --- */}
        <Route
          path="/"
          element={
            <>
              <Logos />
              <ComponentWithStore />
              <hr />
              <ComponentWithStoreTwo />
              <hr />
              <ComponentWithStoreThree />
            </>
          }
        />

        {/* --- Add new routes here --- */}
        <Route path="/about" element={<About />} />

      </Routes>
    </BrowserRouter>
  );
};
```

**Change 1** — Add import after the `// --- Add new page imports here ---` comment:
```jsx
import {{PageName}} from "./pages/{{PageName}}";
```

**Change 2** — Add nav link inside `<nav>` after the last existing `<Link>`:
```jsx
<Link to="{{routePath}}">{{navLabel}}</Link>
```

**Change 3** — Add route after the `{/* --- Add new routes here --- */}` comment:
```jsx
<Route path="{{routePath}}" element={<{{PageName}} />} />
```

#### App.jsx migration (only if BrowserRouter is NOT yet present)

If `App.jsx` does not yet use `BrowserRouter`, replace it entirely with this base, then apply the three changes above:

```jsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// --- Original components ---
import { Logos } from "./components/Logos";
import { ComponentWithStore } from "./components/ComponentWithStore";
import { ComponentWithStoreTwo } from "./components/ComponentWithStoreTwo";
import { ComponentWithStoreThree } from "./components/ComponentWithstoreThree";

// --- Add new page imports here ---

export const App = () => {
  return (
    <BrowserRouter>

      {/* --- Add new nav links here --- */}
      <nav style={{ padding: "0.5rem 1rem", borderBottom: "1px solid #eee" }}>
        <Link to="/" style={{ marginRight: "1rem" }}>Home</Link>
      </nav>

      <Routes>

        {/* --- Home route: original content, do not remove --- */}
        <Route
          path="/"
          element={
            <>
              <Logos />
              <ComponentWithStore />
              <hr />
              <ComponentWithStoreTwo />
              <hr />
              <ComponentWithStoreThree />
            </>
          }
        />

        {/* --- Add new routes here --- */}

      </Routes>
    </BrowserRouter>
  );
};
```

---

## When to Reuse vs Create a Store

| Situation | Decision |
|-----------|----------|
| The page needs to display `username`, `isLoggedIn`, or other user-level state | Import `useStore` from `../stores/useStore` (named export) — do NOT create a new store |
| The page has its own local state (a form field, a counter, a description) | Create a new `{{pageName}}Store.js` — keep page state isolated |
| Two pages need to share the same piece of state | Add that state to `useStore.jsx` instead of creating a new store |

---

## Output Format

The agent must output exactly the following blocks for each file, with no extra commentary:

```
FILE: src/stores/{{pageName}}Store.js
---
[full file content]
---

FILE: src/pages/{{PageName}}.jsx
---
[full file content]
---

FILE: src/pages/{{PageName}}.css
---
[full file content]
---

MODIFY: src/App.jsx
ADD AFTER "// --- Add new page imports here ---":
---
import {{PageName}} from "./pages/{{PageName}}";
---
ADD AFTER last <Link> inside <nav>:
---
<Link to="{{routePath}}">{{navLabel}}</Link>
---
ADD AFTER "{/* --- Add new routes here --- */}":
---
<Route path="{{routePath}}" element={<{{PageName}} />} />
---
```

---

## Full Example

**Input:**
- `{{PageName}}` = `Contact`
- `{{routePath}}` = `/contact`
- `{{navLabel}}` = `Contact`
- `{{needsStore}}` = `yes`
- `{{storeField}}` = `message`

---

**Output:**

```
FILE: src/stores/contactStore.js
---
import { create } from "zustand";

const useContactStore = create((set) => ({
  message: "",
  setMessage: (value) => set({ message: value }),
}));

export default useContactStore;
---

FILE: src/pages/Contact.jsx
---
import useContactStore from "../stores/contactStore";
import { useStore } from "../stores/useStore";
import "./Contact.css";

const Contact = () => {
  const { message, setMessage } = useContactStore();
  const { username } = useStore();

  return (
    <div className="contact-page">
      <h1>Contact</h1>
      <p>{username || "No username set"}</p>

      <textarea
        placeholder="Write here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      {message && <p>{message}</p>}
    </div>
  );
};

export default Contact;
---

FILE: src/pages/Contact.css
---
.contact-page {
  max-width: 480px;
  margin: 3rem auto;
  padding: 0 1rem;
  font-family: sans-serif;
}

.contact-page h1 {
  margin-bottom: 1rem;
}

.contact-page textarea {
  width: 100%;
  min-height: 100px;
  padding: 0.6rem;
  font-size: 0.95rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  resize: vertical;
  box-sizing: border-box;
}

.contact-page p {
  margin-top: 1rem;
  font-size: 0.95rem;
  color: #444;
}
---

MODIFY: src/App.jsx
ADD AFTER "// --- Add new page imports here ---":
---
import Contact from "./pages/Contact";
---
ADD AFTER last <Link> inside <nav>:
---
<Link to="/contact">Contact</Link>
---
ADD AFTER "{/* --- Add new routes here --- */}":
---
<Route path="/contact" element={<Contact />} />
---
```

---

## Constraints

- **Never delete** existing imports, components, or routes in `App.jsx`
- **Never rename** existing files
- **Never modify** files in `src/components/` or `src/stores/useStore.jsx`
- **Always use default export** for page components and page-specific stores
- **Always use named import** for `useStore`: `import { useStore } from "../stores/useStore"`
- **CSS class names** must use the `{{pageName}}-page` pattern (kebab-case, e.g. `contact-page`)
- **One store per page** — do not put multiple pages' state in a single new store
- If `react-router-dom` is missing from `package.json`, halt and output the install command before any code
