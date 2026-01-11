import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import CreateBlog from "../pages/Createblog";
import EditBlog from "../pages/EditBlog";
import ViewBlog from "../pages/ViewBlog";
import SingleBlog from "../pages/SingleBlog";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blogs" element={<ViewBlog />} />
      <Route path="/createblog" element={<CreateBlog />} />
      <Route path="/edit/:id" element={<EditBlog />} />
      <Route path="/blog/:id" element={<SingleBlog />} />
    </Routes>
  );
};

export default AppRoutes;
