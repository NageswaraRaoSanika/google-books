import React, { useContext } from "react";
import BooksContext from "../../store/Books.context";

const StatsComponent = () => {
  const { stats, clientReqTime, serverReqTime } = useContext(BooksContext);

  return stats ? (
    <nav className="level is-mobile mt-6 mx-6 px-6">
      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Total Records</p>
          <p className="title is-4">{stats?.totalRecords}</p>
        </div>
      </div>
      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Most Common Author</p>
          <p className="title is-4">{stats?.mostCommonAuthor}</p>
        </div>
      </div>
      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Recently Published</p>
          <p className="title is-4">
            {`${stats?.recentlyPublished?.name} @ ${stats?.recentlyPublished?.date}`}
          </p>
        </div>
      </div>
      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Request Response Time</p>
          <p className="title is-6">{`Client to Node: ${clientReqTime} Seconds`}</p>
          <p className="title is-6">{`Node to Google API: ${serverReqTime} Seconds`}</p>
        </div>
      </div>
    </nav>
  ) : (
    <></>
  );
};

export default StatsComponent;
