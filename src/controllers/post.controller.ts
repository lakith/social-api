import { Request, Response } from 'express';

import PostModel, {Post}  from '../models/post.model';


const createPost = async (req: Request, res: Response) => {
  const { title, activeStatus, postContent} = req.body;

  if (!title && !activeStatus && !postContent) {
    return res.status(400).json({ message: 'Invalid Request Body'});
  }

  const postInput: Post = new PostModel({
    title,
    postContent,
    activeStatus,
  });

  const postCreated : Post = await postInput.save();

  return res.status(201).json(postCreated);
};


const updatePost = async(req: Request, res: Response) => {
  const { title, activeStatus, postContent} = req.body;
  const {id} = req.params

  let existingPost = await PostModel.findById(id);

  if(existingPost) {
    existingPost.activeStatus = activeStatus;
    existingPost.title = title;
    existingPost.postContent = postContent
  } else {
    return res.status(400).json({ message: 'Post Not Found'});
  }
  const updateResponse: any = existingPost?.save();
  return res.status(200).json(existingPost);
}


const getPost = async (req: Request, res: Response) => {
  const {sort, ascending} = req.query;

  let posts: any = []
  if(sort) {
    posts = ascending === "true" ? 
      await PostModel.find().sort({ createdAt: 'asc'}).populate('Comment').exec() :
      await PostModel.find().sort({ createdAt: 'desc'}).populate('Comment').exec();
      return res.status(200).json(posts);
  }
  posts = await PostModel.find().populate('Comment');
  console.log(posts)
  return res.status(200).json(posts);
};


const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;

  const postData : any = await PostModel.deleteOne({_id: id});

  return res.status(200).json({ message: 'Todo deleted successfully.' });
};

export { createPost, deletePost, getPost, updatePost};