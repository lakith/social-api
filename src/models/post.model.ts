import mongoose, { Schema, model } from 'mongoose';

export interface Post extends mongoose.Document {
  comments: [string];
  title: string;
  postContent: string,
  activeStatus: boolean;
};

const PostSchema = new Schema(
  {
    title: {
      type: Schema.Types.String,
      required: true,
    },
    postContent: {
      type: Schema.Types.String,
      required: true,
    },
    activeStatus: {
      type: Schema.Types.Boolean,
      required: true,
    },
    comments: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    }]
  },
  {
    collection: 'Post',
    timestamps: true,
  },
);

// PostSchema.virtual("Comment", {
//   ref: "Post",
//   localField: "_id",
//   foreignField: "post"
// })

export default model<Post>('Post', PostSchema);