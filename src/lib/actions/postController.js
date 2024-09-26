import { uploadOnCloudinary } from "@/utils/cloudnary";
import Post from "../models/post";
import connectDB from "../database/db";

export const createPost = async (req, res) => {
    try {

        const connection  = await connectDB() ;
        if (!connection) {
            return res.status(500).json({ statusCode: 500, message: 'Database connection failed' });
        }
        const {title , description} = req.body; 
        if (!title || !description){
            return res.status(404).json({statusCode : 404 , message: "Title and description are required !!!"})
        }         
        const existingPost = await Post.findOne({ $or: [{ title }, { description }] });
        if (existingPost) {
            return res.status(409).json({ statusCode: 409, message: 'Post already exists'});
        }

        const thumbnailFile = req.files?.thumbnail ? req.files.thumbnail[0] : null;
        const thumbnailPath = thumbnailFile? await uploadOnCloudinary(thumbnailFile) : null;

        const post = await Post.create({ title , description , picture:thumbnailPath });

        res.status(200).json({ statusCode: 200, data: post, message: 'Post successfully created'});
    } catch (error) {
        res.status(500).json({ statusCode: 500, message: `Error: ${error.message}`});
    }
}

export const updatePost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        if (!post) {
            response.status(404).json({ msg: 'Post not found' })
        }
        
        await Post.findByIdAndUpdate( request.params.id, { $set: request.body })

        response.status(200).json('post updated successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}

export const deletePost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);
        
        await post.delete()

        response.status(200).json('post deleted successfully');
    } catch (error) {
        response.status(500).json(error)
    }
}

export const getPost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        response.status(200).json(post);
    } catch (error) {
        response.status(500).json(error)
    }
}

export const getAllPosts = async (request, response) => {
    let username = request.query.username;
    let category = request.query.category;
    let posts;
    try {
        if(username) 
            posts = await Post.find({ username: username });
        else if (category) 
            posts = await Post.find({ categories: category });
        else 
            posts = await Post.find({});
            
        response.status(200).json(posts);
    } catch (error) {
        response.status(500).json(error)
    }
}