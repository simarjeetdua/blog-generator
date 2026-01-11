import { useEffect, useState } from "react";
import axios from "axios";
import FullBlogCard from "../components/FullBlogCard";

function ViewBlog(){
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);
   const [error, setError] = useState("");
   
  useEffect(()=>{
    const fetchBlog = async()=>{
      try {
        const response = await axios.get("/api/blogs");
        setBlog(response.data);
      } catch (error) {
        console.error("error fetching blog: ", error);
        alert("failed to fetch blogs");
      }
      finally{
        setLoading(false);
      }
    };
    fetchBlog();
  },[]);


    if (loading) {
    return <p className="loader">Loading blogs...</p>;
  }
   if (error) {
    return <p className="hint">{error}</p>;
  }
  if (!blog) return <p className="hint">Blog not found</p>;

 return (
    <div className="app">
      <header className="header">
        <h1>📚 All Blogs</h1>
        <p>Read all published blogs</p>
      </header>

      <div className="container">
        <div className="blog-grid">
          {blog.map((blog, index) => (
            <FullBlogCard key={blog._id || index} blog={blog} />
          ))}
        </div>

        {blog.length === 0 && (
          <p className="hint">No blogs available</p>
        )}
      </div>
    </div>
  );
}

export default ViewBlog;
