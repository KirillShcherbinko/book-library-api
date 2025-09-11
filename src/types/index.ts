export type TOpenLibraryBook = {
  key: string;
  title: string;
  authors: { id: string; name: string }[];
  cover_url?: string;
};

export type TOpenLibraryBookRaw = {
  key: string;
  title: string;
  authors: { author: { key: string } }[];
  description?: string;
  covers?: number[];
  subjects?: string[];
};

export type TOpenLibraryBookInfo = {
  key: string;
  title: string;
  author: string;
  description?: string;
  covers?: number[];
  subjects?: string[];
};

export type TOpenLibraryAuthor = { name: string };

export type TExternalApiResponse = {
  key: string;
  name: string;
  subject_type: string;
  solr_query: string;
  work_count: number;
  works: TOpenLibraryBook[];
};
