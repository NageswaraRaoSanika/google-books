import axios from "axios";
import React, { useState } from "react";
import HomePage from "./pages/home.page";
import BooksContext, {
  AppContextInterface,
  Books,
  Stats,
} from "./store/Books.context";

function App() {
  const [books, setBooks] = useState<Books>(undefined);
  const [stats, setStats] = useState<Stats>(null);
  const [searchString, setSearchString] = useState<string>("");
  const [currentPage, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [recordsPerPage, setRecordsPerPage] = useState<number>(10);

  const SERVICE_URL = "http://localhost:3001";
  const endpoint = "/books";

  const getBooks = async (searchString = "", page = 1, recordsPerPage = 10) => {
    setLoading(true);
    const { data } = await axios.get(
      `${SERVICE_URL}${endpoint}?query=${searchString}&page=${page}&recordsPerPage=${recordsPerPage}`
    );

    setBooks(data.books);
    setStats(data.stats);
    setRecordsPerPage(recordsPerPage);
    setPage(page);
    setSearchString(searchString);
    setLoading(false);
  };

  const store: AppContextInterface = {
    books,
    stats,
    searchString,
    currentPage,
    loading,
    recordsPerPage,
    setBooks,
    getBooks,
  };

  return (
    <BooksContext.Provider value={store}>
      <HomePage />
    </BooksContext.Provider>
  );
}

export default App;
