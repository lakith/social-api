import mongoose, { Schema, model } from 'mongoose';

export interface Collection extends mongoose.Document {
  arts: [string];
  creator: string;
  title: string;
  collectionContent: string,
  activeStatus: boolean;
};

const CollectionSchema = new Schema(
  {
    title: {
      type: Schema.Types.String,
      required: true,
    },
    collectionContent: {
      type: Schema.Types.String,
      required: true,
    },
    activeStatus: {
      type: Schema.Types.Boolean,
      required: true,
    },
    imageString: {
      type: Schema.Types.String,
      required: false,
    },
    arts: [{
      type: Schema.Types.ObjectId,
      ref: 'Art',
    }],
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  },
  {
    collection: 'Collection',
    timestamps: true,
  },
);

export default model<Collection>('Collection', CollectionSchema);