import apiError from "../middlewares/apiError";
import Blog from "../models/blog.model.js";

export const blogById = async(req,res,next)=>{
    try {
        const blogId = await Blog.findById(req.params.id)
        res.status(200).json({
            success: true,
            message: "Blog fetched successfully",
            blogId
        });
        if(!blogById){
            return next(new apiError(404, "Blog not found", [{message: "No blog found with this ID"}]));
        }
        res.status(200).json(blogById);
    } catch (error) {
        next(new apiError(500, "Error in fetching blog by ID", [{message: error.message}]));
    }
}