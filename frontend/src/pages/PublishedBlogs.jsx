import { useEffect, useState } from "react";
// import axios from "axios";
import Card from "../components/Card";
import api from "../api";

function PublishedBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPublishedBlogs = async () => {
      try {
        const response = await api.get("/api/blogs/published");
        setBlogs(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load published blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchPublishedBlogs();
  }, []);

  if (loading) return <p className="loader">Loading published blogs...</p>;
  if (error) return <p className="hint">{error}</p>;

  return (
    <div className="app">
      <header className="header">
        <h1>📢 Published Blogs</h1>
        <p>Only blogs visible to readers</p>
      </header>

      <div className="container">
        <div className="blog-grid">
          {blogs.map((blog) => (
            <Card key={blog._id} blog={blog} />
          ))}
        </div>

        {blogs.length === 0 && (
          <p className="hint">No published blogs yet</p>
        )}
      </div>
    </div>
  );
}

export default PublishedBlogs;
