import React, { useContext } from "react";
import Layout from "../components/layout/layout.component";
import Search from "../components/search/search.component";
import StatsComponent from "../components/stats/stats.component";
import BooksTable from "../components/table/table.component";
import BooksContext from "../store/Books.context";

const HomePage = () => {
  const { loading } = useContext(BooksContext);

  return (
    <Layout>
      <Search />
      {loading ? (
        <button className="button is-info is-loading mb-6"></button>
      ) : (
        <>
          <StatsComponent />
          <div className="hero-body">
            <BooksTable />
          </div>
        </>
      )}
    </Layout>
  );
};

export default HomePage;
