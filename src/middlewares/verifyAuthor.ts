import { NextFunction, Response } from 'express';
import { CustomRequest } from '../types/types';
import jwt from 'jsonwebtoken';
const secretKey: string | undefined = process.env
  .JWT_AUTHOR_SECRET_KEY as string; //Secret JWT Key

const verifyAuthor = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  if (!req.token) {
    res.status(403).json({
      message: 'Token not found',
    });
    return;
  }
  //Verifies token
  jwt.verify(req.token, secretKey, (err, decoded) => {
    if (err) {
      res.status(403).json({
        message: err.message,
      });
      return;
    }
    //If authorData is valid
    if (typeof decoded === 'object') {
      req.authorId = decoded?.author?.id;
      next();
    } else {
      res.status(403).json({
        message: 'Unauthorized action',
      });
      return;
    }
  });
};

export default verifyAuthor;
