import { Request, Response } from 'express';
import Post from '../models/post';

export const createPost = async (req: Request, res: Response) => {
    try {
        const { title, content, author } = req.body;
        const newPost = new Post({ title, content, author });
        const savedPost = await newPost.save();
        res.status(201).json({ message: 'Post created successfully', post: savedPost });
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
};

export const getPosts = async (req: Request, res: Response) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
};

export const getPost = async (req: Request, res: Response) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
};

export const updatePost = async (req: Request, res: Response) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post updated successfully', post: updatedPost });
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
};

export const deletePost = async (req: Request, res: Response) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
};
