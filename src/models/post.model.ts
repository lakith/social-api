import mongoose, { Schema, model } from 'mongoose';

export interface Post extends mongoose.Document {
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
  },
  {
    collection: 'Post',
    timestamps: true,
  },
);

PostSchema.virtual("Comment", {
  ref: "Post",
  localField: "_id",
  foreignField: "post"
})

export default model<Post>('Post', PostSchema);