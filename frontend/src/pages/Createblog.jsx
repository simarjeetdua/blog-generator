import { useState } from "react";
import axios from "axios";

const Createblog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/blogs", {
        title,
        content,
      });

      alert("Blog created successfully!");
      setTitle("");
      setContent("");
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Failed to create blog");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />

      <button type="submit">Create Blog</button>
    </form>
  );
};

export default Createblog;
