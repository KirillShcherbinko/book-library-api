import { TExternalApiResponse } from '@/types';

export const getBooksByCategory = async (
  category: string,
  limit?: number | null,
  page?: number | null,
): Promise<any[]> => {
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
  const books = (data as TExternalApiResponse).works.map((book) => {
    return {
      id: book.key,
      author: book.authors,
      title: book.title,
      categories: book.subject.slice(10),
    };
  });
  return books;
};
