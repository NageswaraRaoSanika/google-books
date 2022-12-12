import React, { useContext } from "react";
import BooksContext from "../../store/Books.context";

const StatsComponent = () => {
  const { stats } = useContext(BooksContext);

  return stats ? (
    <nav className="level is-mobile mt-6 mx-6 px-6">
      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Total Records</p>
          <p className="title">{stats?.totalRecords}</p>
        </div>
      </div>
      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Most Common Author</p>
          <p className="title">{stats?.mostCommonAuthor}</p>
        </div>
      </div>
      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Recently Published</p>
          <p className="title">
            {`${stats?.recentlyPublished?.name} @ ${stats?.recentlyPublished?.date}`}
          </p>
        </div>
      </div>
    </nav>
  ) : (
    <></>
  );
};

export default StatsComponent;
