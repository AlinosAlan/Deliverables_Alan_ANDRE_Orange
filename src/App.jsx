import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
 
// --- Original components ---
import { Logos } from "./components/Logos";
import { ComponentWithStore } from "./components/ComponentWithStore";
import { ComponentWithStoreTwo } from "./components/ComponentWithStoreTwo";
import { ComponentWithStoreThree } from "./components/ComponentWithstoreThree";
 
// --- Add new page imports here ---
import About from "./pages/About";
import Book from "./pages/Book"; 

export const App = () => {
  return (
    <BrowserRouter>
 
      {/* --- Add new nav links here --- */}
      <nav style={{ padding: "0.5rem 1rem", borderBottom: "1px solid #eee" }}>
        <Link to="/" style={{ marginRight: "1rem" }}>Home</Link>
        <Link to="/about">About</Link>
        <Link to="/book">Book</Link>
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
        <Route path="/book" element={<Book />} />

      </Routes>
    </BrowserRouter>
  );
};
 