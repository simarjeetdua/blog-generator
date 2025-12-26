import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req,res)=>{
    res.json(
        {
            message: "simar server is running successfull",
            timestamp: new Date().toDateString()
        }
    )
    res.status(201);
})

app.get("/home", (req,res)=>{
    res.send("API is running... on the HOME PAGE");
    res.status(200);
})

app.get("/api/blogs", (req,res)=>{
    const blogs_message_json = [
        {
            status: "success",
            message: "Blogs Fetched Successfully",
            timestamp: new Date().toDateString()
        },
        {
            status: "success",
            message: "backend server is running.....",
            timestamp: new Date().toDateString()
        },
        {
            status: "success",
            message: "blog server is running fine",
            timestamp: new Date().toDateString()
        }
    ]
    res.status(202).json(blogs_message_json);
})

app.listen(PORT, ()=>{
    console.log(`server is running on PORT : ${PORT}`);
})