import { bookModel } from '@/models/Book';
import { BookInput } from '@/types/graphql-types';

export const addBookToLibrary = (userId: string, book: BookInput) => {
  const isBookTaken = bookModel.findOne({ key: book.key });
};
