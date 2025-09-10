export type TOpenLibraryBook = {
  key: string;
  title: string;
  authors: { id: string; name: string }[];
  subject: string[];
};

export type TExternalApiResponse = {
  key: string;
  name: string;
  subject_type: string;
  solr_query: string;
  work_count: number;
  works: TOpenLibraryBook[];
};
