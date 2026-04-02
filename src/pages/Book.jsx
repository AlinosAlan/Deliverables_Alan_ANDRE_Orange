import useBookStore from "../stores/bookStore";
import { useStore } from "../stores/useStore";
import "./Book.css";

const Book = () => {
  const { bookAge, bookCase, setBookAge, setBookCase } = useBookStore();
  const { username } = useStore();

  return (
    <div className="book-page">
      <h1>My Favorite Book</h1>
      <p>{username || "No username set"}</p>

      <div className="book-form">
        <label htmlFor="book-age">Book Age (years):</label>
        <input
          id="book-age"
          type="text"
          placeholder="How old is this book?"
          value={bookAge}
          onChange={(e) => setBookAge(e.target.value)}
        />

        <label htmlFor="book-case">Why I Love This Book:</label>
        <textarea
          id="book-case"
          placeholder="Write your case for why this is your favorite book..."
          value={bookCase}
          onChange={(e) => setBookCase(e.target.value)}
        />
      </div>

      {(bookAge || bookCase) && (
        <div className="book-display">
          {bookAge && <p><strong>Age:</strong> {bookAge} years old</p>}
          {bookCase && (
            <div>
              <strong>My Case:</strong>
              <p>{bookCase}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Book;