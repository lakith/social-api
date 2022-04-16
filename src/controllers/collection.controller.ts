import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { createACollection } from '../services/collection.service';

export const createCollection = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await createACollection(req.body);
    const response = {
      message: 'Success',
      data,
    };

    res.status(httpStatus.OK).send(response);
  } catch (error) {
    next(error);
  }
};