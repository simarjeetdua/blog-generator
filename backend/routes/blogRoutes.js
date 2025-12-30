import express from "express";
import Blog from "../models/blog.model.js";

const router = express.Router();

/* =========================
   CREATE BLOG
   POST /api/blogs
   ========================= */
router.post("/blogs", async (req, res) => {
  try {
    const { title, content, author } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    const blog = await Blog.create({
      title,
      content,
      author,
      isPublished: false,
    });

    res.status(201).json(blog);
  } catch (error) {
    console.error("Create blog error:", error);
    res.status(500).json({ message: "Failed to create blog" });
  }
});

/* =========================
   GET ALL BLOGS
   GET /api/blogs
   ========================= */
router.get("/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
});

/* =========================
   GET ONLY PUBLISHED BLOGS
   GET /api/blogs/published
   ========================= */
router.get("/blogs/published", async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true }).sort({
      createdAt: -1,
    });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch published blogs" });
  }
});

/* =========================
   GET SINGLE BLOG
   + INCREASE VIEWS
   GET /api/blogs/:id
   ========================= */
router.get("/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ message: "Invalid blog ID" });
  }
});

/* =========================
   UPDATE BLOG
   PUT /api/blogs/:id
   ========================= */
router.put("/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Failed to update blog" });
  }
});

/* =========================
   PUBLISH / UNPUBLISH BLOG
   PATCH /api/blogs/:id/publish
   ========================= */
router.patch("/blogs/:id/publish", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    blog.isPublished = !blog.isPublished;
    await blog.save();

    res.status(200).json({
      message: `Blog ${
        blog.isPublished ? "published" : "unpublished"
      } successfully`,
      blog,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update publish status" });
  }
});

/* =========================
   LIKE BLOG
   PATCH /api/blogs/:id/like
   ========================= */
router.patch("/blogs/:id/like", async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Failed to like blog" });
  }
});

/* =========================
   DELETE BLOG
   DELETE /api/blogs/:id
   ========================= */
router.delete("/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete blog" });
  }
});

export default router;
