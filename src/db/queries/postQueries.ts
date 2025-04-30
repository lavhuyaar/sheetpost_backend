import db from '../db';

type SortOrder = 'asc' | 'desc';

interface PostFilters {
  skip?: number;
  take?: number;
  orderBy?: {
    createdAt?: SortOrder;
  };
  where?: {
    isPublished?: boolean;
    id?: string;
    authorId?: string;
  };
  include?: {
    [key: string]: boolean;
  };
}

//Gets all published posts (for website)
export const getPosts = async (
  limit: number,
  page: number,
  sortBy: SortOrder,
) => {
  //Pagination values
  const safeLimit: number = Math.max(1, limit);
  const safePage: number = Math.max(1, page);
  const startIndex: number = (safePage - 1) * safeLimit;

  const filters: PostFilters = {
    skip: startIndex,
    take: safeLimit,
    orderBy: { createdAt: sortBy },
    where: {
      isPublished: true,
    },
  };

  const postsCount = await db.post.count({ where: filters.where });
  const posts = await db.post.findMany(filters);

  return {
    postsCount,
    posts,
  };
};

export const getPostById = async (id: string) => {
  const post = await db.post.findUnique({
    where: {
      id,
    },
    include: {
      author: true,
      comments: true,
    },
  });

  return post;
};

export const getPostsByAuthorId = async (
  authorId: string,
  limit: number,
  page: number,
  sortBy: SortOrder,
) => {
  //Pagination values
  const safeLimit: number = Math.max(1, limit);
  const safePage: number = Math.max(1, page);
  const startIndex: number = (safePage - 1) * safeLimit;

  const filters: PostFilters = {
    skip: startIndex,
    take: safeLimit,
    orderBy: { createdAt: sortBy },
    where: {
      authorId,
      isPublished: true,
    },
    include: {
      comments: true,
    },
  };

  const posts = await db.post.findMany(filters);

  return posts;
};

export const createPost = async (
  title: string,
  content: string,
  authorId: string,
  isPublished: boolean,
) => {
  const newPost = await db.post.create({
    data: {
      title: title.trim(),
      content: content.trim(),
      authorId: authorId.trim(),
      isPublished,
    },
  });
  return newPost;
};

export const editPostById = async (
  title: string,
  content: string,
  isPublished: boolean,
  id: string,
  authorId: string,
) => {
  const editedPost = await db.post.update({
    where: {
      id,
      authorId,
    },
    data: {
      title,
      content,
      isPublished,
    },
  });
  return editedPost;
};

export const deletePostById = async (id: string, authorId: string) => {
  await db.post.delete({
    where: {
      id,
      authorId,
    },
  });
};

export const getAdminPosts = async (
  authorId: string,
  limit: number,
  page: number,
  sortBy: SortOrder,
) => {
  //Pagination values
  const safeLimit: number = Math.max(1, limit);
  const safePage: number = Math.max(1, page);
  const startIndex: number = (safePage - 1) * safeLimit;

  console.log(safeLimit, safePage, startIndex);

  const posts = await db.post.findMany({
    skip: startIndex,
    take: safeLimit,
    orderBy: { createdAt: sortBy },
    where: {
      authorId,
    },
  });
  const totalCount = await db.post.count({
    where: {
      authorId,
    },
  });

  return { posts, totalCount };
};

export const getAuthorPost = async (id: string, authorId: string) => {
  const post = await db.post.findFirst({
    where: {
      id,
      authorId,
    },
    include: {
      comments: true,
    },
  });
  return post;
};
