import { createContext } from "react";

export interface Book {
  title: string;
  image: string;
  authors: Array<string>;
  identifier: string;
}

export type Books = Array<Book> | undefined;

type RecentBook = {
  name: string;
  date: string;
};

export type Stats = {
  totalRecords?: number;
  mostCommonAuthor?: string;
  recentlyPublished?: RecentBook;
} | null;

export interface AppContextInterface {
  books?: Books;
  stats?: Stats;
  getBooks?: (
    searchString?: string,
    page?: number,
    recordsPerPage?: number
  ) => void;
  setBooks?: (books: Books) => void;
  currentPage?: number;
  recordsPerPage?: number;
  searchString?: string;
  loading?: boolean;
}

const BooksContext = createContext<AppContextInterface>({});

export default BooksContext;
