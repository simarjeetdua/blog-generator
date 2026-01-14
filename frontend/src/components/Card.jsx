import axios from "axios";
import { Link } from "react-router-dom";

const Card = ({ blog, onDelete }) => {
  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmed) return;

    try {
      await axios.delete(`/api/blogs/${blog._id}`);
      alert("Blog deleted successfully");
      if (onDelete) onDelete(blog._id);
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Failed to delete blog");
    }
  };

  return (
    <div className="blog-card">
      {blog.imageUrl && (
        <img
          src={`http://localhost:5000${blog.imageUrl}`}
          alt={blog.title}
        />
      )}

      <div className="blog-content">
        <Link to={`/blog/${blog._id}`}>
          <h3 className="blog-title">{blog.title}</h3>
        </Link>

        <p className="excerpt">
          {blog.content?.slice(0, 120)}...
        </p>

        <div className="meta">
          <span>✍ Written by {blog.author || "Guest"}</span>
          <span>
            📅 {new Date(blog.createdAt).toLocaleDateString()}
          </span>
        </div>

        {/* DELETE BUTTON */}
        {onDelete && (
          <div className="card-actions">
            <button className="delete-btn" onClick={handleDelete}>
              🗑 Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
