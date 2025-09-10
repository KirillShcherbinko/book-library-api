import { TExternalApiResponse } from '@/types';
import { Book } from '@/types/graphql-types';

export const getBooksByCategory = async (
  category: string,
  limit?: number | null,
  page?: number | null,
): Promise<Book[]> => {
  const params = new URLSearchParams();

  params.append('fields', 'key,title,subject');
  params.append('limit', String(limit || 10));
  params.append('page', String(page || 1));

  const result = await fetch(
    `${process.env.EXTERNAL_API_URL}/subjects/${category}.json?${params.toString()}`,
  );

  if (!result.ok) {
    throw new Error(`External API error: ${result.status} ${result.statusText}`);
  }

  const data = await result.json();

  const books: Book[] = (data as TExternalApiResponse).works.map(
    ({ key, title, authors, subject }) => {
      return {
        id: key,
        authors: authors.map((author) => author.name),
        title: title,
        categories: subject.slice(0, 10),
      };
    },
  );
  return books;
};
