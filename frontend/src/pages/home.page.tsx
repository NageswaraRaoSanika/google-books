import React, { useContext } from "react";
import Layout from "../components/layout/layout.component";
import Search from "../components/search/search.component";
import StatsComponent from "../components/stats/stats.component";
import BooksTable from "../components/table/table.component";
import BooksContext from "../store/Books.context";

const HomePage = () => {
  const {
    loading,
    stats,
    currentPage,
    recordsPerPage,
    getBooks,
    searchString,
  } = useContext(BooksContext);

  const totalRecords = stats?.totalRecords;
  const totalPages =
    recordsPerPage && totalRecords
      ? Math.ceil(totalRecords / recordsPerPage)
      : 0;

  const handlePageNav = (page: number) => {
    getBooks && getBooks(searchString, page, recordsPerPage);
  };

  return (
    <Layout>
      <Search />
      {loading ? (
        <button className="button is-info is-loading mb-6"></button>
      ) : (
        <>
          <StatsComponent />
          {totalRecords && (
            <div className="container my-3">
              <p>
                {`Page ${currentPage}, Showing ${
                  recordsPerPage &&
                  currentPage &&
                  currentPage * recordsPerPage - recordsPerPage + 1
                } - ${
                  recordsPerPage && currentPage && recordsPerPage * currentPage
                } of ${totalRecords}`}
              </p>
            </div>
          )}
          <div className="hero-body">
            <BooksTable />
          </div>
          {totalRecords && (
            <div className="container mb-5">
              <nav
                className="pagination is-small"
                role="navigation"
                aria-label="pagination"
              >
                {currentPage && currentPage > 1 && (
                  <button
                    type="button"
                    onClick={(e: React.SyntheticEvent) =>
                      handlePageNav(currentPage - 1)
                    }
                    className="pagination-previous"
                  >
                    Previous Page
                  </button>
                )}
                {currentPage && totalPages !== currentPage && (
                  <button
                    type="button"
                    onClick={(e: React.SyntheticEvent) =>
                      handlePageNav(currentPage + 1)
                    }
                    className="pagination-next"
                  >
                    Next Page
                  </button>
                )}
              </nav>
            </div>
          )}
        </>
      )}
    </Layout>
  );
};

export default HomePage;
