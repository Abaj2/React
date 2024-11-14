import { SocialIcon } from "react-social-icons";
import { useState, useEffect } from "react";
import "./App.css";
function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchRandomQuote();
  }, []);

  const fetchRandomQuote = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://api.api-ninjas.com/v1/quotes", {
        headers: { "X-Api-Key": "9VElTudumVEp0A3FK0b+7g==CInufO7b3ni1bLgM" },
      });

      const data = await response.json();
      console.log(data);
      const { quote, author, category } = data[0];
      setQuote(quote);
      setAuthor(author);
      setCategory(category);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching quote:", error);
      setLoading(false);
    }
  };
  return (
    <div className="app">
      <div className="quote-box" id="quote-box">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <p className="text" id="text">
              "{quote}"
            </p>
            <p className="author" id="author">
              - {author}
            </p>
            <SocialIcon
              url="https://twitter.com"
              href={`https://twitter.com/intent/tweet?text="${quote}"%20-%20${author}`}
              target="_blank"
              rel="noopener noreferrer"
              className="tweet-quote"
              id="tweet-quote"
            />
            <button
              className="new-quote"
              id="new-quote"
              onClick={fetchRandomQuote}
            >
              New Quote
            </button>
          </>
        )}
      </div>
    </div>
  );
}
export default App;
