import { useState, useEffect } from "react";
import Bookmark from "./Bookmark";

const API = import.meta.env.VITE_API_URL;

function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  useEffect(() => {}, []);
  return (
    <div className="Bookmarks">
      <section>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Take me there</th>
              <th>See this bookmark</th>
            </tr>
          </thead>
          <tbody>
            {bookmarks.map((bookmark) => {
              return <Bookmark key={bookmark.id} bookmark={bookmark} />;
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Bookmarks;
