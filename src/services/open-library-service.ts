import {
  TExternalApiResponse,
  TOpenLibraryAuthor,
  TOpenLibraryBookInfo,
  TOpenLibraryBookRaw,
} from '@/types';
import { Book } from '@/types/graphql-types';

const { EXTERNAL_API_URL } = process.env;

////////// Получение книг из библиотеки //////////
export const getBooksByCategory = async (
  category: string,
  limit?: number | null,
  page?: number | null,
): Promise<Book[]> => {
  const params = new URLSearchParams();

  params.append('fields', 'key,authors,title,cover_url');
  params.append('limit', String(limit || 10));
  params.append('page', String(page || 1));

  const result = await fetch(`${EXTERNAL_API_URL}/subjects/${category}.json?${params.toString()}`);

  if (!result.ok) {
    throw new Error(`External API error: ${result.status} ${result.statusText}`);
  }

  const data = await result.json();

  return (data as TExternalApiResponse).works.map(({ key, title, authors, cover_url }) => {
    return {
      key,
      authors: authors.map((author) => author.name),
      title,
      coverUrl: cover_url,
    };
  });
};

////////// Получение данных об авторе //////////
export const getAuthor = async (key: string): Promise<string> => {
  const params = new URLSearchParams();
  params.append('fields', 'name');

  const result = await fetch(`${EXTERNAL_API_URL}${key}.json?${params.toString()}`);

  if (!result.ok) {
    throw new Error(`External API error: ${result.status} ${result.statusText}`);
  }

  const data = await result.json();
  return (data as TOpenLibraryAuthor).name;
};

////////// Получение данных о книге //////////
export const getBook = async (key: string): Promise<TOpenLibraryBookInfo> => {
  const params = new URLSearchParams();
  params.append('fields', 'key,authors,title,covers,description,subjects');

  const result = await fetch(`${EXTERNAL_API_URL}${key}.json?${params.toString()}`);

  if (!result.ok) {
    throw new Error(`External API error: ${result.status} ${result.statusText}`);
  }

  const data = (await result.json()) as TOpenLibraryBookRaw;
  const firstAuthorKey = data.authors?.[0]?.author?.key;

  return {
    key: data.key,
    title: data.title,
    author: firstAuthorKey ? await getAuthor(firstAuthorKey) : 'Unknown',
    description: data.description,
    covers: data.covers,
    subjects: data.subjects,
  };
};
