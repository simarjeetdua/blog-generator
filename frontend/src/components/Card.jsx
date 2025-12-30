import { Link } from "react-router-dom";

const Card = ({ blog }) => {
  if (!blog?._id) return null;

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
          <span>✍ {blog.author || "Anonymous"}</span>
          <span>
            📅 {new Date(blog.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
