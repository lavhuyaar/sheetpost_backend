import { NextFunction, Response } from 'express';
import { CustomRequest } from '../types/types';
import jwt from 'jsonwebtoken';
const secretKey: string | undefined = process.env.JWT_USER_SECRET_KEY as string; //Secret JWT Key

const verifyUser = (req: CustomRequest, res: Response, next: NextFunction) => {
  if (!req.token) {
    res.status(401).json({
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
    //If userData is valid
    if (typeof decoded === 'object') {
      req.userId = decoded?.user?.id;
      next();
    } else {
      res.status(403).json({
        message: 'Unauthorized action',
      });
      return;
    }
  });
};

export default verifyUser;
