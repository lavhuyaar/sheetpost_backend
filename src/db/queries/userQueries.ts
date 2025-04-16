import db from '../db';

export const createUser = async (
  firstName: string,
  lastName: string,
  username: string,
  password: string,
) => {
  await db.user.create({
    data: { firstName, lastName, username, password },
  });
};

export const getUserById = async (id: string) => {
  const user = await db.user.findUnique({
    where: {
      id,
    },
  });
  return user;
};

export const getUserByUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
  });
  return user;
};
