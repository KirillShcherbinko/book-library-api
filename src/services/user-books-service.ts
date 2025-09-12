import { bookModel } from '@/models/Book';
import { userModel } from '@/models/User';
import { Book, BookInput } from '@/types/graphql-types';
import { GraphQLError } from 'graphql';
import { Document } from 'mongoose';

export const getUserBooks = async (userId: string, limit: number = 10, page: number = 1) => {
  const userData = await userModel.findById(userId);

  if (!userData) {
    throw new GraphQLError('User is not found', { extensions: { code: 'NOT_FOUND' } });
  }

  const userWithBooks = await userData.populate<{ takenBooks: (Book & Document)[] }>({
    path: 'takenBooks',
    options: {
      skip: (page - 1) * limit,
      limit,
      sort: { key: 1 },
    },
  });

  if (!userWithBooks) {
    throw new GraphQLError('User is not found', { extensions: { code: 'NOT_FOUND' } });
  }

  return userWithBooks.takenBooks;
};

export const addBookToLibrary = async (userId: string, book: BookInput) => {
  const bookData = await bookModel.findOneAndUpdate(
    { key: book.key },
    { $setOnInsert: { ...book } },
    { new: true, upsert: true },
  );

  const userData = await userModel.findByIdAndUpdate(
    userId,
    { $addToSet: { takenBooks: bookData._id } },
    { new: true },
  );

  if (!userData) {
    throw new GraphQLError('User not found', { extensions: { code: 'NOT_FOUND' } });
  }

  return true;
};

export const removeBookFromLibrary = async (userId: string, bookKey: string) => {
  await userModel.findByIdAndUpdate(userId, { $pull: { takenBooks: { key: bookKey } } });
  return true;
};
