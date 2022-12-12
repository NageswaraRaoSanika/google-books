import React from "react";

type RecentBook = {
  name: string;
  date: string;
};

type StatsComponentProps = {
  totalRecords?: number;
  mostCommonAuthor?: string;
  recentlyPublished?: RecentBook;
}; /* use `interface` if exporting so that consumers can extend */

// Easiest way to declare a Function Component; return type is inferred.
const StatsComponent = ({ totalRecords }: StatsComponentProps) => (
  <nav className="level is-mobile mt-6 mx-6 px-6">
    <div className="level-item has-text-centered">
      <div>
        <p className="heading">Total Records</p>
        <p className="title">{totalRecords}</p>
      </div>
    </div>
    <div className="level-item has-text-centered">
      <div>
        <p className="heading">Most Common Author</p>
        <p className="title"></p>
      </div>
    </div>
    <div className="level-item has-text-centered">
      <div>
        <p className="heading">Recently Published</p>
        <p className="title"></p>
      </div>
    </div>
  </nav>
);

export default StatsComponent;
