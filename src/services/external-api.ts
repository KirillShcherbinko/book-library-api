import { TExternalApiResponse } from '@/types';

export const getBooksByCategory = async (
  category: string,
  limit: number,
  page: number,
): Promise<any[]> => {
  const result = await fetch(
    `${process.env.EXTERNAL_API_URL}/subjects/${category}.json?limit=${limit}&page=${page}`,
  );

  if (!result.ok) {
    throw new Error(`External API error: ${result.status} ${result.statusText}`);
  }

  const data = await result.json();
  const books = (data as TExternalApiResponse).works.map((book) => {
    return {
      id: book.key,
      title: book.title,
      categories: book.subject.slice(10),
    };
  });
  return books;
};
