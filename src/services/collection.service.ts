import CollectionModel, { Collection } from '../models/collection.model';

/**
 * @param {*} collection - collection data from the rest endpoint
 * @returns - returns created collection data
 */
export const createACollection = async (collection) => {
  try {
    const newCollection: Collection = new CollectionModel({ ...collection });

    collection = await newCollection.save();
    const data = {
      collection,
    };

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllCollections = async () => {
  try {
    const collections = await CollectionModel.find();
    const data = {
      collections,
    };

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCollectionsByUser = async (userId) => {
  try {
    const collections = await CollectionModel.find({ creator: userId });
    const data = {
      collections,
    };

    return data;
  } catch (error) {
    console.log(error);
  }
};
