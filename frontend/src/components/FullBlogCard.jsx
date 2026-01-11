import { Link } from "react-router-dom";
const FullBlogCard = ({ blog }) => {
    if (!blog?._id) return null;

    return (
        <div className="full-blog-card">
            <h2>
                <Link to={`/blog/${blog._id}`} className="blog-link">
                    {blog.title}
                </Link>
            </h2>
            <p className="full-content">
                {blog.content}
            </p>

            <div className="meta">
                <span>✍ {blog.author || "Anonymous"}</span>
                <span>📅 {new Date(blog.createdAt).toLocaleDateString()}</span>
            </div>

            <hr />
        </div>
    )
}
export default FullBlogCard;