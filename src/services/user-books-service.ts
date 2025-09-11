import { bookModel } from '@/models/Book';
import { userModel } from '@/models/User';
import { BookInput } from '@/types/graphql-types';
import { GraphQLError } from 'graphql';

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
