import mongoose, { Schema, model } from 'mongoose';

export interface Art extends mongoose.Document {
  commentContent: string,
  activeStatus: boolean;
};

const ArtSchema = new Schema(
  {
    artTitle: {
      type: Schema.Types.String,
      required: true,
    },
    activeStatus: {
      type: Schema.Types.Boolean,
      required: true,
    },
    collection: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Collection'
    },
    imageString: {
      type: Schema.Types.String,
      required: true,
    },
    bid: {
      type: Schema.Types.Number,
      required: false,
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