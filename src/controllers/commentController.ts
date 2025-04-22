import { NextFunction, Request, Response } from 'express';
import {
  createComment,
  deleteAdminComment,
  deleteUserComment,
  editComment,
  getCommentsByAuthorId,
  getCommentsByPostId,
} from '../db/queries/commentQueries';
import { CustomRequest } from '../types/types';
import { validationResult } from 'express-validator';
import { validateComment } from '../validators/validators';

export const getCommentsOnPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { postId } = req.params;

  if (!postId) {
    res.status(404).json({
      message: 'Post ID not found',
    });
    return;
  }

  const { comments, totalCount } = await getCommentsByPostId(postId);
  res.status(200).json({
    comments,
    totalCount,
  });
  return;
};

//All comments made on all posts by a single author
export const getCommentsOnAuthor = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const { authorId } = req;

  if (!authorId) {
    res.status(404).json({
      message: 'Invalid token or Author not found',
    });
    return;
  }

  const { comments, totalCount } = await getCommentsByAuthorId(authorId);
  res.status(200).json({
    comments,
    totalCount,
  });
  //Later add the logic to delete all comments with this postId as well
  return;
};

export const editCommentById = [
  ...validateComment,
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { userId } = req;
    const { commentId } = req.params;

    if (!userId) {
      res.status(404).json({
        message: 'Invalid token or User not found',
      });
      return;
    }
    if (!commentId) {
      res.status(404).json({
        message: 'Missing Comment ID',
      });
      return;
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(401).json({
        errors: errors.array(),
      });
      return;
    }

    const { content } = req.body;

    const comment = await editComment(content, commentId, userId);

    if (!comment) {
      res.status(404).json({
        message: 'Unable to edit comment',
      });
      return;
    }

    res.status(200).json({
      comment,
      message: 'Comment updated successfully',
    });
    return;
  },
];

export const deleteCommentByUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const { userId } = req;
  if (!userId) {
    res.status(404).json({
      message: 'Invalid token or User not found',
    });
    return;
  }

  const { commentId } = req.params;
  if (!commentId) {
    res.status(404).json({
      message: 'Missing Comment ID',
    });
    return;
  }

  await deleteUserComment(commentId, userId);

  res.status(200).json({
    message: 'Comment deleted successfully',
  });
  return;
};

export const deleteCommentByAdmin = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const { authorId } = req;
  if (!authorId) {
    res.status(404).json({
      message: 'Invalid token or Author not found',
    });
    return;
  }

  const { commentId } = req.params;
  if (!commentId) {
    res.status(404).json({
      message: 'Missing Comment ID',
    });
    return;
  }

  await deleteAdminComment(commentId, authorId);
  res.status(200).json({
    message: 'Comment deleted successfully',
  });
  return;
};

export const createNewComment = [
  ...validateComment,
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { userId } = req;
    if (!userId) {
      res.status(404).json({
        message: 'Invalid token or User not found',
      });
      return;
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(401).json({
        errors: errors.array(),
      });
      return;
    }

    const { authorId, content, postId } = req.body;

    const newComment = await createComment(content, postId, userId, authorId);

    if (!newComment) {
      res.status(400).json({
        message: 'Failed to add comment',
      });
      return;
    }

    res.status(200).json({
      comment: newComment,
      message: 'Comment created successfully',
    });
  },
];
