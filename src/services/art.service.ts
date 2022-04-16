import ArtModel, { Art } from '../models/art.model';

export const createArt = async (art) => {
  try {
    const newArt: Art = new ArtModel({ ...art });

    art = await newArt.save();
    const data = {
      art,
    };

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getArtByCollection = async (id) => {
  try {
    const arts = await ArtModel.find({ artCollection: id });
    const data = {
      arts,
    };

    return data;
  } catch (error) {
    console.log(error);
  }
};
