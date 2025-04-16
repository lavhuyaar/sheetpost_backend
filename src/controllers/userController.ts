import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, getUserByUsername } from '../db/queries/userQueries';

const secretKey: string | undefined = process.env.JWT_USER_SECRET_KEY as string; //Secret JWT Key

//Signs up User (in website)
export const signUpUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { username, firstName, lastName, password } = req.body;

  const isUsernameExists = await getUserByUsername(username); //Check if username exists

  if (isUsernameExists) {
    res.status(405).json({
      message: 'Username already exists!',
    });
    return;
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10); //Hashed password
    await createUser(firstName, lastName, username, hashedPassword);
    res.status(200).json({
      message: 'User is created!',
    });
    return;
  } catch (err) {
    console.error(err);
    next(err);
  }
};

//Logs in User (in website)
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { username, password } = req.body;

  const user = await getUserByUsername(username);

  if (!user) {
    res.status(404).json({
      message: 'Invalid username',
    });
    return;
  }

  const match = await bcrypt.compare(password, user.password.trim());
  if (!match) {
    res.status(401).json({ message: 'Incorrect password' });
    return;
  }

  //JWT Token
  const token: string = jwt.sign({ user }, secretKey, {
    expiresIn: '7 days', //Valid for 7 days
  });
  res.status(200).json({
    user,
    token,
  });
  return;
};
