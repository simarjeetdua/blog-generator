const errorHandler = (err, req, res, next)=>{
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        errors: err.errors || [],
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
}
export default errorHandler;