import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [isPublished, setisPublished] = useState(false);
  const [author, setAuthor] = useState("");


  // Fetch existing blog
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`/api/blogs/${id}`);
        setTitle(response.data.title);
        setAuthor(response.data.author || "");
        setContent(response.data.content);
        setisPublished(response.data.isPublished);
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
        author: author.trim() || "Anonymous",
      });

      alert("Blog updated successfully");
      navigate(`/blog/${id}`);
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Failed to update blog");
    }
  };
  const togglePublish = async () => {
      try {
        setPublishing(true);
        const res = await axios.patch(`/api/blogs/${id}/publish`);
        setisPublished(res.data.blog.isPublished);
        alert(res.data.blog.isPublished ? "Blog published!" : "Blog unpublished!");

      } catch (error) {
        console.error(error.response?.data || error.message);
        alert("Failed to publish blog");
      }
      finally{
        setPublishing(false);
      }
  }

  if (loading) {
    return <p className="loader">Loading blog...</p>;
  }

   return (
    <div className="edit-page">
      <h2 className="edit-title">Edit Blog</h2>

       <input
          type="text"
          placeholder="Author name (optional)"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          autoComplete="off"
        />

      {/* Publish Bar */}
      <div className="publish-bar">
        <span className={`status ${isPublished ? "live" : "draft"}`}>
          {isPublished ? "● Published" : "● Draft"}
        </span>

        <button
          type="button"
          className="publish-btn"
          onClick={togglePublish}
          disabled={publishing}
        >
          {publishing ? "Updating...": isPublished ? "Unpublish" : "Publish"}
        </button>
      </div>

      <form className="edit-form" onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <button type="submit">Update Content</button>
      </form>
    </div>
  );
}

export default EditBlog;

