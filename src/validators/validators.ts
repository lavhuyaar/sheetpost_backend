import { body } from 'express-validator';

export const validateSignUpAdmin = [
  body('firstName')
    .trim()
    .isAlpha()
    .withMessage('First name must contain only alphabets')
    .isLength({ min: 2, max: 15 })
    .withMessage('First name must be between 2 and 15 characters'),
  body('lastName')
    .trim()
    .isAlpha()
    .withMessage('Last name must contain only alphabets')
    .isLength({ min: 2, max: 15 })
    .withMessage('Last name must be between 2 and 15 characters'),
  body('email').trim().isEmail().withMessage('Email address must be valid'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be atleast 6 letters'),
];

export const validateSignUpUser = [
  body('firstName')
    .trim()
    .isAlpha()
    .withMessage('First name must contain only alphabets')
    .isLength({ min: 2, max: 15 })
    .withMessage('First name must be between 2 and 15 characters'),
  body('lastName')
    .trim()
    .isAlpha()
    .withMessage('Last name must contain only alphabets')
    .isLength({ min: 2, max: 15 })
    .withMessage('Last name must be between 2 and 15 characters'),
  body('username')
    .trim()
    .isLength({ min: 2, max: 15 })
    .withMessage('Username must be between 2 and 15 characters'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be atleast 6 letters'),
];

export const validatePost = [
  body('title')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Title must be between 2 and 50 characters'),
  body('content')
    .trim()
    .isLength({ min: 2, max: 3000 })
    .withMessage('Content must be between 2 and 3000 characters'),
  body('isPublished')
    .isBoolean()
    .withMessage('Post must be either published or unpublished'),
];

export const validateComment = [
  body('content')
    .trim()
    .isLength({ min: 2, max: 250 })
    .withMessage(
      'Comment must contain atleast 2 characters and not more than 250 characters',
    ),
];
