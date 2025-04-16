import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { createAuthor, getAuthorByMail } from '../db/queries/authorQueries';

const secretKey: string | undefined = process.env
  .JWT_AUTHOR_SECRET_KEY as string; //Secret JWT Key

//Signs up Author (in admin panel)
export const signUpAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, firstName, lastName, password } = req.body;

  const isEmailExists = await getAuthorByMail(email); //Check if email exists

  if (isEmailExists) {
    res.status(405).json({
      message: 'Author already exists with this email address!',
    });
    return;
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10); //Hashed password
    await createAuthor(firstName, lastName, email, hashedPassword);
    res.status(200).json({
      message: "Author's profile has been created!",
    });
    return;
  } catch (err) {
    console.error(err);
    next(err);
  }
};

//Logs in Author (in admin panel)
export const loginAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;

  const author = await getAuthorByMail(email);

  if (!author) {
    res.status(404).json({
      message: 'Invalid email',
    });
    return;
  }

  const match = await bcrypt.compare(password, author.password.trim());
  if (!match) {
    res.status(401).json({ message: 'Incorrect password' });
    return;
  }

  //JWT Token
  const token: string = jwt.sign({ author }, secretKey, {
    expiresIn: '3 days', //Valid for 3 days
  });
  res.status(200).json({
    author,
    token,
  });
  return;
};
