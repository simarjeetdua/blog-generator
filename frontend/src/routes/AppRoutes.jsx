import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import CreateBlog from "../pages/Createblog";
import EditBlog from "../pages/EditBlog";
import ViewBlog from "../pages/ViewBlog";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/createblog" element={<CreateBlog />} />
      <Route path="/edit/:id" element={<EditBlog />} />
      <Route path="/blog/:id" element={<ViewBlog />} />
    </Routes>
  );
};

export default AppRoutes;
