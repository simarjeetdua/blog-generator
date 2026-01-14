import { Link, useLocation } from "react-router-dom";
function Navbar() {
    const location = useLocation();
    const match = location.pathname.match(/^\/blog\/[^/]+$/);
    const BlogId = match ? location.pathname.split("/")[2] : null;
    return (
        <nav style={{ padding: "15px", background: "#4f46e5" }}>
            <Link to="/" style={{ color: "white", marginRight: "15px" }}>
                Home
            </Link>
            <Link to="/createblog" style={{ color: "white" }}>
                Create Blog
            </Link>
            <Link to="/blogs" style={{ color: "white" }}>
                View Blogs
            </Link>
            {BlogId && (
                <div className="edit-wrapper">
                    <Link to={`/edit/${BlogId}`} className="edit-link">
                        Edit Blog
                    </Link>
                    <p className="edit-hint">
                        Please Select to edit blog
                    </p>
                </div>
            )}
            <Link to="/published" style={{ color: "white" }}>
            Published Blogs
            </Link>
        </nav>
    )
}
export default Navbar;
