import React, { useContext } from "react";
import BooksContext from "../../store/Books.context";

const BooksTable = () => {
  const { books } = useContext(BooksContext);

  return books ? (
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
        {books?.map((d) => (
          <tr
            key={d.identifier + d.title}
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
  ) : (
    <></>
  );
};

export default BooksTable;
