import mongoose from "mongoose";
const blogSchema =  new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author:{
        type: String,
        default: "Anonymous",
        trim: true,
    },
    imageUrl:{
        type: String,
        required: false,
    },
    isPublished:{
        type: Boolean,
        default: false,
    },
    likes:{
        type: Number,
        default : 0,
    },
    views:{
        type: Number,
        default: 0,
    }

},{timestamps: true});

export default mongoose.model("Blog", blogSchema);

