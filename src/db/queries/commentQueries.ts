import { SortOrder } from '../../types/types';
import db from '../db';

export const getCommentsByPostId = async (postId: string) => {
  const comments = await db.comment.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    where: {
      postId,
    },
    include: {
      user: {
        select: {
          firstName: true,
          lastName: true,
          username: true,
          id: true,
        },
      },
    },
  });

  //Total counts of comments on a single post
  const totalCount = await db.comment.count({
    where: {
      postId,
    },
  });

  return { comments, totalCount };
};

export const getCommentsByAuthorId = async (
  authorId: string,
  limit: number,
  page: number,
  sortBy: SortOrder,
) => {
  const safeLimit: number = Math.max(1, limit);
  const safePage: number = Math.max(1, page);
  const startIndex: number = (safePage - 1) * safeLimit;

  const comments = await db.comment.findMany({
    skip: startIndex,
    take: safeLimit,
    orderBy: {
      createdAt: sortBy,
    },
    where: {
      authorId,
    },
    include: {
      user: {
        select: {
          firstName: true,
          lastName: true,
          username: true,
          id: true,
        },
      },
      post: true,
    },
  });

  //Total counts of comments made on the posts of a single author
  const totalCount = await db.comment.count({
    where: {
      authorId,
    },
  });

  return { comments, totalCount };
};

export const editComment = async (
  content: string,
  id: string,
  userId: string,
) => {
  const comment = await db.comment.update({
    data: {
      content,
    },
    where: {
      id,
      userId,
    },
  });

  return comment;
};

export const deleteUserComment = async (id: string, userId: string) => {
  await db.comment.delete({
    where: {
      id,
      userId,
    },
  });
};

export const deleteAdminComment = async (id: string, authorId: string) => {
  await db.comment.delete({
    where: {
      id,
      authorId,
    },
  });
};

export const deleteAllCommentsOnPost = async (
  postId: string,
  authorId: string,
) => {
  await db.comment.deleteMany({
    where: {
      postId,
      authorId,
    },
  });
};

export const createComment = async (
  content: string,
  postId: string,
  userId: string,
  authorId: string,
) => {
  const newComment = await db.comment.create({
    data: {
      content,
      postId,
      userId,
      authorId,
    },
  });

  return newComment;
};
