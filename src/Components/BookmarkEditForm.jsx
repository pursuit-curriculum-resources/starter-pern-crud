import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

function BookmarkEditForm() {
  let { id } = useParams();
  let navigate = useNavigate();

  const [bookmark, setBookmark] = useState({
    name: "",
    url: "",
    category: "",
    is_favorite: false,
  });

  const updateBookmark = () => {
    fetch(`${API}/bookmarks/${id}`, {
      method: "PUT",
      body: JSON.stringify(bookmark),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        navigate(`/bookmarks/${id}`);
      })
      .catch((error) => console.error("catch", error));
  };

  const handleTextChange = (event) => {
    setBookmark({ ...bookmark, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setBookmark({ ...bookmark, is_favorite: !bookmark.is_favorite });
  };

  useEffect(() => {
    fetch(`${API}/bookmarks/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((responseJSON) => {
        setBookmark(responseJSON);
      })
      .catch((error) => console.error(error));
  }, [id, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateBookmark(bookmark, id);
  };
  return (
    <div className="Edit">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          value={bookmark.name}
          type="text"
          onChange={handleTextChange}
          placeholder="Name of Website"
          required
        />
        <label htmlFor="url">URL:</label>
        <input
          id="url"
          type="text"
          pattern="http[s]*://.+"
          required
          value={bookmark.url}
          placeholder="http://"
          onChange={handleTextChange}
        />
        <label htmlFor="category">Category:</label>
        <input
          id="category"
          type="text"
          name="category"
          value={bookmark.category}
          placeholder="educational, inspirational, ..."
          onChange={handleTextChange}
        />
        <label htmlFor="is_favorite">Favorite:</label>
        <input
          id="is_favorite"
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={bookmark.is_favorite}
        />

        <br />

        <input type="submit" />
      </form>
      <Link to={`/bookmarks/${id}`}>
        <button>Nevermind!</button>
      </Link>
    </div>
  );
}

export default BookmarkEditForm;
