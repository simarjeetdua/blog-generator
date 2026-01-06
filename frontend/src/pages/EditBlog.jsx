import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch existing blog
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`/api/blogs/${id}`);
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (error) {
        alert("Failed to load blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  // Update blog
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`/api/blogs/${id}`, {
        title,
        content,
      });

      alert("Blog updated successfully");
      navigate(`/blog/${id}`);
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Failed to update blog");
    }
  };

  if (loading) {
    return <p className="loader">Loading blog...</p>;
  }

  return (
    <div className="container">
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Edit Blog
      </h2>

      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Blog Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <button type="submit">Update Blog</button>
      </form>
    </div>
  );
}

export default EditBlog;

