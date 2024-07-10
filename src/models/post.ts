import { Schema, model, Document } from 'mongoose';

interface IPost extends Document {
    title: string;
    content: string;
    author: string;
    date: Date;
}

const postSchema = new Schema<IPost>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

const Post = model<IPost>('Post', postSchema);

export default Post;
