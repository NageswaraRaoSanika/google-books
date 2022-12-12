import React, { useContext, useState } from "react";
import BooksContext from "../../store/Books.context";

const Search = () => {
  const { getBooks, currentPage, recordsPerPage } = useContext(BooksContext);
  const [searchString, setSearchString] = useState<string>("");

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    getBooks && getBooks(searchString, currentPage, recordsPerPage);
  };

  return (
    <div className="columns mt-6 mx-6 px-6">
      <form onSubmit={handleSubmit} className="column is-10 field has-addons">
        <div className="control is-expanded">
          <input
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            className="input"
            type="text"
            aria-label="Search"
            placeholder="Find a book"
          />
        </div>
        <div className="control ">
          <button type="submit" className="button">
            Search
          </button>
        </div>
      </form>

      <div className="control column is-3">
        <div className="select">
          <select
            onChange={(e) =>
              getBooks &&
              getBooks(searchString, currentPage, Number(e.currentTarget.value))
            }
          >
            <option>Records per page</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Search;
