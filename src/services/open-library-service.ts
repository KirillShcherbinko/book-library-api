import { fetchJson } from '@/helpers/fetch-json';
import { userModel } from '@/models/User';
import { userSchema } from '@/schema/user-schema';
import { TFetchBookData, TFetchBooksResponse, TSearchBooksResponse } from '@/types';
import { Book } from '@/types/graphql-types';

////////// Получение книг из библиотеки по категориям //////////
export const fetchBooksBySubject = async (
  subject: string,
  limit: number = 10,
  offset: number = 0,
): Promise<Book[]> => {
  const params = new URLSearchParams();

  params.append('fields', 'key,authors,title,cover_id');
  params.append('limit', String(limit));
  params.append('offset', String(offset));

  const data = await fetchJson<TFetchBooksResponse>(
    `/subjects/${subject.toLowerCase().split(' ').join('_')}.json?${params.toString()}`,
  );
  return data.works.map(({ key, title, authors, cover_id: coverId }) => {
    return {
      key,
      authors: authors.map((author) => author.name),
      title,
      coverId,
    };
  });
};

/////////// Поиск книг //////////
export const searchBooks = async (
  searchQuery: string,
  limit: number = 10,
  offset: number = 0,
): Promise<Book[]> => {
  const params = new URLSearchParams();

  params.append('q', searchQuery);
  params.append('fields', 'key,title,author_name,cover_i');
  params.append('limit', String(limit));
  params.append('offset', String(offset));

  const data = await fetchJson<TSearchBooksResponse>(`/search.json?${params.toString()}`);
  return data.docs.map(({ key, title, author_name: authors, cover_i: coverId }) => {
    return {
      key,
      title,
      authors: authors || ['Unknown'],
      coverId,
    };
  });
};

////////// Получение данных о книге //////////
export const fetchBook = async (key: string, userId?: string): Promise<Book> => {
  const params = new URLSearchParams();
  params.append('fields', 'key,title,authors,covers,description,subjects');

  const data = await fetchJson<TFetchBookData>(`${key}.json?${params.toString()}`);

  const books = await searchBooks(key);
  const currentBook = books.find((book) => book.key === key);

  const user = await userModel.findById(userId).populate('takenBooks');

  // Проверяем, есть ли книга с таким ключом в его библиотеке
  const isInLibrary = user?.takenBooks?.some((book: any) => book.key === key) ?? false;

  return {
    key: data.key,
    title: data.title,
    authors: currentBook?.authors || ['Unknown'],
    description: typeof data.description === 'string' ? data.description : data.description?.value,
    coverIds: data.covers?.slice(0, 10) || [],
    subjects: data.subjects?.slice(0, 10) || [],
    isInLibrary,
  };
};
