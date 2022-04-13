import mongoose, { Schema, model } from 'mongoose';

export interface Art extends mongoose.Document {
  commentContent: string,
  activeStatus: boolean;
};

const ArtSchema = new Schema(
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
        ref: 'Collection'
    },
    creator: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },
  {
    collection: 'Art',
    timestamps: true,
  },
);


export default model<Art>('Art', ArtSchema);