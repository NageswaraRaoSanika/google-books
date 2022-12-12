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

const formatResponse = (data: any) => {
  const formattedData = {
    total: data?.totalItems,
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
  console.log(req.params);

  const url = `${booksAPI}?q=hello&startIndex=1&maxResults=40`;
  const { data } = await axios.get(url);
  res.send(formatResponse(data));
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
