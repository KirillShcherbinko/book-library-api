import { popularBooksSubjects } from '@/data/popular-books-subjects';
import { subjects } from '@/data/subjects';

export const fetchSubjects = () => {
  return Object.keys(subjects) || [];
};

export const fetchSubSubjects = (subject: string) => {
  return subjects[subject] || [];
};

export const fetchPopularBooksSubject = () => {
  return popularBooksSubjects;
};
