import { NextFunction, Request, Response } from 'express';
import {
  createPost,
  deletePostById,
  editPostById,
  getPostById,
  getPosts,
  getPostsByAuthorId,
} from '../db/queries/postQueries';
import { CustomRequest, SortOrder } from '../../types';

export const getAllPosts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {
    limit = 10,
    page = 1,
    sortBy = 'desc',
    fromAdmin = false,
  } = req.query;

  const reqFromUser = fromAdmin !== 'true';

  const { postsCount, posts } = await getPosts(
    Number(limit),
    Number(page),
    sortBy as SortOrder,
    reqFromUser,
  );

  res.status(200).json({
    postsCount,
    posts,
  });
  return;
};

export const getPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { postId } = req.params;

  if (!postId) {
    res.status(404).json({
      message: 'Missing Post ID',
    });
    return;
  }

  const post = await getPostById(postId);
  if (!post) {
    res.status(404).json({
      message: 'Post not found',
    });
    return;
  }

  res.status(200).json({
    post,
  });
  return;
};

export const getAuthorPosts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { authorId } = req.params;
  const {
    fromAdmin = false,
    limit = 10,
    page = 1,
    sortBy = 'desc',
  } = req.query;

  const reqFromUser = !fromAdmin;

  if (!authorId) {
    res.status(404).json({
      message: 'Invalid Author ID',
    });
    return;
  }

  const posts = await getPostsByAuthorId(
    authorId,
    Number(limit),
    Number(page),
    sortBy as SortOrder,
    reqFromUser,
  );

  res.status(200).json({
    posts,
  });
  return;
};

export const createNewPost = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const { authorId } = req;
  const { title, content, isPublished } = req.body;

  if (authorId) {
    const newPost = await createPost(title, content, authorId, isPublished);
    res.status(200).json({
      post: newPost,
      message: 'Post created successfully',
    });
    return;
  } else {
    res.status(404).json({
      message: 'Invalid token or Author not found',
    });
  }
};

export const editPost = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const { postId } = req.params;
  const { authorId } = req;
  const { title, content, isPublished } = req.body;
  if (!postId) {
    res.status(404).json({
      message: 'Post not found',
    });
    return;
  }

  if (authorId) {
    const editedPost = await editPostById(
      title,
      content,
      isPublished,
      postId,
      authorId,
    );
    res.status(200).json({
      post: editedPost,
      message: 'Post edited successfully',
    });
    return;
  } else {
    res.status(404).json({
      message: 'Invalid token or Author not found',
    });
  }
};

export const deletePost = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const { postId } = req.params;
  const { authorId } = req;

  if (!postId) {
    res.status(404).json({
      message: 'Post not found',
    });
    return;
  }

  if (authorId) {
    await deletePostById(postId, authorId);
    res.status(200).json({
      message: 'Post deleted successfully',
    });
    return;
  } else {
    res.status(404).json({
      message: 'Invalid token or Author not found',
    });
  }
};
