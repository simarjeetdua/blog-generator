import { useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import "../App.css";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [count, setCount] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/blogs");
      setBlogs(response.data);
      setCount(response.data.length);
      setLoaded(true);
    } catch (error) {
      console.error("Error fetching blogs", error);
      alert("Failed to load blogs");
    } finally {
      setLoading(false);
    } 
  };
  const handleDeleteBlog = async (id) => {
    setBlogs((prevBlogs)=> 
    prevBlogs.filter((blog)=> blog._id !==id)
  );
  setCount((prevCount)=> prevCount -1);
  };
  

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <h1>📝 Blog Maker App</h1>
        <p>Create • Read • Edit Blogs</p>
      </header>

      {/* Actions */}
      <div className="container">
        <div className="actions">
          <button onClick={fetchBlogs} disabled={loading}>
            {loading ? "Loading..." : "Refresh Blogs"}
          </button>
          <span>Total blogs: {count}</span>
        </div>

        {/* Hint */}
        {!loaded && (
          <p className="hint">
            Click <strong>Refresh Blogs</strong> to load blog posts
          </p>
        )}

        {/* Blog List */}
       <div className="blog-grid">
          {blogs.map((blog) => (
            <Card
              key={blog._id}
              blog={blog}
              onDelete={handleDeleteBlog}   
            />
          ))}
        </div>

        {/* Empty state */}
        {loaded && blogs.length === 0 && (
          <p className="hint">No blogs found. Create one!</p>
        )}
      </div>
    </div>
  );
}

export default Home;
