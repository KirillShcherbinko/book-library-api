export type TFetchBooksData = {
  key: string;
  title: string;
  authors: { id: string; name: string }[];
  cover_id?: number;
};

export type TSearchBookData = {
  key: string;
  title: string;
  author_name: string[];
  cover_i?: number;
};

export type TFetchBookData = {
  key: string;
  title: string;
  authors: { author: { key: string } }[];
  description?: string | { value: string };
  covers: number[];
  subjects: string[];
};

export type TFetchBooksResponse = {
  work_count: number;
  works: TFetchBooksData[];
};

export type TSearchBooksResponse = {
  numFound: number;
  docs: TSearchBookData[];
};
