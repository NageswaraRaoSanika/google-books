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
  const [clientReqTime, setClientReqTime] = useState(0);
  const [serverReqTime, setServerReqTime] = useState(0);

  const SERVICE_URL = "http://localhost:3001";
  const endpoint = "/books";

  const getBooks = async (searchString = "", page = 1, recordsPerPage = 10) => {
    setLoading(true);
    const start = Date.now();
    const { data } = await axios.get(
      `${SERVICE_URL}${endpoint}?query=${searchString}&page=${page}&recordsPerPage=${recordsPerPage}`
    );
    const finish = Date.now();

    const time = (finish - start) / 1000;
    setClientReqTime(time);

    setBooks(data.books);
    setStats(data.stats);
    setServerReqTime(data.reqResponseTime);
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
    clientReqTime,
    serverReqTime,
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
