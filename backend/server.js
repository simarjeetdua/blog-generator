import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorHandler.js";
import blogRoutes from "./routes/blogRoutes.js";
dotenv.config();

const app = express();

connectDB();




app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());    

app.use("/api", blogRoutes);



app.get("/", (req,res)=>{
    res.status(200).json(
        {
            message: "simar server is running successfull",
            timestamp: new Date().toDateString()
        }
    )
})



app.get("/home", (req,res)=>{
   res.status(200).send("welcome to home page")
})

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`server is running on PORT : ${PORT}`);
})