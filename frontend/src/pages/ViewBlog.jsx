import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ViewBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get(`/api/blogs/${id}`)
    .then(res => setBlog(res.data));
  }, [id]);

  if (!blog) return <p className="loader">Loading...</p>;

  return (
    <div className="container">
      <h1>{blog.title}</h1>

      {blog.image && (
        <img
          src={`http://localhost:5000${blog.image}`}
          alt={blog.title}
          className="view-image"
        />
      )}

      <p>{blog.content}</p>

      <button
        type="button"
        onClick={() => navigate(`/edit/${blog._id}`)}
      >
        Edit Blog
      </button>
    </div>
  );
}

export default ViewBlog;
