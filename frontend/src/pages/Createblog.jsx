import { useState } from "react";
import axios from "axios";

const Createblog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post("/api/blogs", {
        title,
        content,
        author,
        isPublished,
      });

      alert(
        isPublished
          ? "Blog created and published!"
          : "Blog saved as draft!"
      );

      setTitle("");
      setContent("");
      setAuthor("");
      setIsPublished(false);
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-page">
      <h2 className="edit-title">Create Blog</h2>

      <form className="edit-form" onSubmit={handleSubmit}>
        <input
          placeholder="Blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Author name (optional)"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          autoComplete="off"
        />


        <textarea
          placeholder="Write your blog content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        {/* ✅ Publish Toggle */}
        <div className="publish-row">
          <span className={`status ${isPublished ? "live" : "draft"}`}>
            {isPublished ? "● Published" : "● Draft"}
          </span>

          <label className="switch">
            <input
              type="checkbox"
              checked={isPublished}
              onChange={() => setIsPublished(!isPublished)}
            />
            <span className="slider"></span>
          </label>
        </div>

        <button type="submit" disabled={loading}>
          {loading
            ? "Saving..."
            : isPublished
              ? "Publish Blog"
              : "Save Draft"}
        </button>
      </form>
    </div>
  );
};

export default Createblog;

