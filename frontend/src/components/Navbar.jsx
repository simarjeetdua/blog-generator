import { Link } from "react-router-dom";
function Navbar(){
    return(
        <nav style={{ padding: "15px", background: "#4f46e5" }}>
            <Link to = "/" style={{ color: "white", marginRight: "15px" }}>
              Home
            </Link>
            <Link to = "/createblog" style={{ color: "white" }}>
             Create Blog
            </Link>
        </nav>
    )
}
export default Navbar;
