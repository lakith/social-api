import mongoose, { Schema, model } from 'mongoose';

export interface Comment extends mongoose.Document {
  commentContent: string,
  activeStatus: boolean;
};

const CommentSchema = new Schema(
  {
    commentContent: {
      type: Schema.Types.String,
      required: true,
    },
    activeStatus: {
      type: Schema.Types.Boolean,
      required: true,
    },
    post: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Post'
    }
  },
  {
    collection: 'Comment',
    timestamps: true,
  },
);


export default model<Comment>('Comment', CommentSchema);