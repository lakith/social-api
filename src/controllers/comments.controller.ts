import { Request, Response } from 'express';
import mongoose from 'mongoose' 
import CommentModel, {Comment}  from '../models/comments.model';


const createComment = async (req: Request, res: Response) => {
  const { commentContent, activeStatus, post} = req.body;

  if (!commentContent) {
    return res.status(422).json({ message: 'The fields name commentContent is required' });
  }

  const commentInput: Comment = new CommentModel({
    commentContent,
    activeStatus,
    post
  });

  const commentCreated : Comment = await commentInput.save();

  return res.status(201).json(commentCreated);
};


const updateComment = async(req: Request, res: Response) => {
  const {activeStatus, commentContent} = req.body;
  const {id} = req.params

  let existingComment = await CommentModel.findById(id);

  if(existingComment) {
    existingComment.activeStatus = activeStatus;
    existingComment.commentContent = commentContent;
  } else {
    return res.status(400).json({ message: 'Post Not Found'});
  }
  const updateResponse: any = existingComment?.save();
  return res.status(200).json(existingComment);
}


const getCommentsByPost = async (req: Request, res: Response) => {
  const {sort, ascending} = req.query;
  const {postId} = req.params

  let comments: any = []
  if(sort) {
    comments = ascending === "true" ? 
      await CommentModel.find({post: mongoose.Types.ObjectId(postId)}).sort({ createdAt: 'asc'}).exec() :
      await CommentModel.find({post: mongoose.Types.ObjectId(postId)}).sort({ createdAt: 'desc'}).exec();
      return res.status(200).json(comments);
  }
  comments = await CommentModel.find({post: mongoose.Types.ObjectId(postId)});
  return res.status(200).json(comments);
};


const deleteComments = async (req: Request, res: Response) => {
  const { id } = req.params;

  const commentData : any = await CommentModel.deleteOne({_id: id});

  return res.status(200).json({ message: 'Comment deleted successfully.' });
};

export { createComment, getCommentsByPost, deleteComments, updateComment};