import db from '../db';

export const createAuthor = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
) => {
  await db.author.create({
    data: { firstName, lastName, email, password },
  });
};

export const getAuthorById = async (id: string) => {
  const author = await db.author.findUnique({
    where: {
      id,
    },
  });
  return author;
};

export const getAuthorByMail = async (email: string) => {
  const author = await db.author.findUnique({
    where: {
      email,
    },
  });
  return author;
};
