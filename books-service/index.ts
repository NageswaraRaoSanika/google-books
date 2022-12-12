import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors, { CorsOptions } from "cors";
import axios from "axios";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;
const booksAPI = "https://www.googleapis.com/books/v1/volumes";

// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins = ["http://localhost:3000"];

const options: CorsOptions = {
  origin: allowedOrigins,
};

// Then pass these options to cors:
app.use(cors(options));

const mostCommonString = (array: Array<string>) => {
  if (array.length == 0) return null;
  var modeMap: Record<string, number> = {};
  var maxEl = array[0],
    maxCount = 1;
  for (var i = 0; i < array.length; i++) {
    var el = array[i];
    if (modeMap[el] == null) modeMap[el] = 1;
    else modeMap[el]++;
    if (modeMap[el] > maxCount) {
      maxEl = el;
      maxCount = modeMap[el];
    }
  }
  return maxEl;
};

const formatResponse = (data: any) => {
  const books = data?.items || [];
  books.sort(function (a: any, b: any) {
    return (
      new Date(b.volumeInfo.publishedDate).getTime() -
      new Date(a.volumeInfo.publishedDate).getTime()
    );
  });

  const recentBook = data?.items[0];
  const mostCommonAuthor = mostCommonString(
    books
      ?.map((item: any) => item?.volumeInfo?.authors)
      ?.reduce(
        (acc: Array<string>, curr: Array<string>) =>
          curr ? [...acc, ...curr] : [...acc],
        []
      )
  );

  const formattedData = {
    stats: {
      totalRecords: data?.totalItems,
      mostCommonAuthor,
      recentlyPublished: {
        name: recentBook.volumeInfo?.title,
        date: recentBook.volumeInfo?.publishedDate,
      },
    },
    books: data?.items.map((item: any) => ({
      title: item?.volumeInfo?.title,
      subtitle: item?.volumeInfo?.subtitle,
      authors: item?.volumeInfo?.authors,
      imageLarge: item?.volumeInfo?.imageLinks?.thumbnail,
      image: item?.volumeInfo?.imageLinks?.smallThumbnail,
      preview: item?.volumeInfo?.thumbnail,
      identifier: item?.volumeInfo?.industryIdentifiers?.map(
        (m: any) => m.identifier
      ),
    })),
  };

  return formattedData;
};

app.get("/books", async (req: Request, res: Response) => {
  const { query, page, recordsPerPage } = req.query;

  const url = `${booksAPI}?q=${query}&startIndex=${page}&maxResults=${recordsPerPage}`;
  const { data } = await axios.get(url);
  res.send(formatResponse(data));
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
