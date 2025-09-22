import { popularBooksSubjects } from '@/data/popular-books-subjects';
import { subjects } from '@/data/subjects';
import { Subject } from '@/types/graphql-types';

export const fetchSubjects = () => {
  return subjects;
};

export const fetchPopularBooksSubject = () => {
  return popularBooksSubjects;
};
