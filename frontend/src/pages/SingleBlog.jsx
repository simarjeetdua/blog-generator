import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
import api from "../api";

function SingleBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [liking, setLiking] = useState(false);

  // Fetch single blog (views increase automatically)
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await api.get(`/api/blogs/${id}`);
        setBlog(response.data);
      } catch (error) {
        alert("Failed to load blog");
      }
    };

    fetchBlog();
  }, [id]);

  // Like blog
  const handleLike = async () => {
    try {
      setLiking(true);
      const response = await api.patch(`/api/blogs/${id}/like`);
      setBlog(response.data);
    } catch (error) {
      alert("Failed to like blog");
    } finally {
      setLiking(false);
    }
  };

  if (!blog) return <p className="loader">Loading blog...</p>;

  return (
    <div className="view-page">
      <h1 className="view-title">{blog.title}</h1>

      <div className="view-meta">
        <span>✍ {blog.author || "Anonymous"}</span>
        <span>📅 {new Date(blog.createdAt).toLocaleDateString()}</span>
      </div>

      <div className="view-stats">
        <span>👁 {blog.views} views</span>
        <span>❤️ {blog.likes} likes</span>
      </div>

      <p className="view-content">{blog.content}</p>

      <div className="view-actions">
        <button onClick={handleLike} disabled={liking}>
          {liking ? "Liking..." : "❤️ Like"}
        </button>

        <button onClick={() => navigate(`/edit/${blog._id}`)}>
          ✏ Edit
        </button>
      </div>
    </div>
  );
}

export default SingleBlog;
