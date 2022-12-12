import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../components/layout/layout.component";
import StatsComponent from "../components/stats/stats.component";

type Response = {
  total: number;
  books: Array<any>;
};

const HomePage = () => {
  const [data, setData] = useState<Response>({
    books: [],
    total: 0,
  });

  useEffect(() => {
    axios.get("http://localhost:3001/books").then(({ data: d }) => setData(d));
  }, []);

  return (
    <Layout>
      <div className="field has-addons mt-6 mx-6 px-6">
        <div className="control is-expanded">
          <input
            className="input"
            type="text"
            placeholder="Find a repository"
          />
        </div>
        <div className="control ">
          <button className="button">Search</button>
        </div>
      </div>
      <StatsComponent />
      <div className="hero-body">
        <table className="table is-fullwidth mx-6">
          <tbody>
            <tr>
              <td className="px-6 py-5" style={{ width: "400px" }}>
                Title
              </td>
              <td className="px-6 py-5" style={{ width: "350px" }}>
                Author
              </td>
              <td className="px-6 py-5">Identifier</td>
              <td className="px-6 py-5"> Actions</td>
            </tr>
            {data?.books.map((d) => (
              <tr
                key={d.title}
                style={{
                  height: "100px",
                  verticalAlign: "middle",
                  border: "0",
                }}
              >
                <td className="px-6 py-5">
                  <div className="columns p-4">
                    <figure className="image is-48x48">
                      <img alt={d.title} src={d.image} />
                    </figure>
                    <div className="ml-4">{d?.title}</div>
                  </div>
                </td>
                <td className="px-6 py-5">{d?.authors?.join(", ")}</td>
                <td className="px-6 py-5">{d?.identifier}</td>
                <td className="px-6 py-5">
                  <button className="button is-small is-rounded">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default HomePage;
