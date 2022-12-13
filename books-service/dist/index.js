"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
const booksAPI = "https://www.googleapis.com/books/v1/volumes";
// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins = ["http://localhost:3000"];
const options = {
    origin: allowedOrigins,
};
// Then pass these options to cors:
app.use((0, cors_1.default)(options));
const mostCommonString = (array) => {
    if (array.length == 0)
        return null;
    var modeMap = {};
    var maxEl = array[0], maxCount = 1;
    for (var i = 0; i < array.length; i++) {
        var el = array[i];
        if (modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;
        if (modeMap[el] > maxCount) {
            maxEl = el;
            maxCount = modeMap[el];
        }
    }
    return maxEl;
};
const formatResponse = (data) => {
    var _a, _b, _c;
    const books = (data === null || data === void 0 ? void 0 : data.items) || [];
    books.sort(function (a, b) {
        return (new Date(b.volumeInfo.publishedDate).getTime() -
            new Date(a.volumeInfo.publishedDate).getTime());
    });
    const recentBook = data === null || data === void 0 ? void 0 : data.items[0];
    const mostCommonAuthor = mostCommonString((_a = books === null || books === void 0 ? void 0 : books.map((item) => { var _a; return (_a = item === null || item === void 0 ? void 0 : item.volumeInfo) === null || _a === void 0 ? void 0 : _a.authors; })) === null || _a === void 0 ? void 0 : _a.reduce((acc, curr) => curr ? [...acc, ...curr] : [...acc], []));
    const formattedData = {
        stats: {
            totalRecords: data === null || data === void 0 ? void 0 : data.totalItems,
            mostCommonAuthor,
            recentlyPublished: {
                name: (_b = recentBook.volumeInfo) === null || _b === void 0 ? void 0 : _b.title,
                date: (_c = recentBook.volumeInfo) === null || _c === void 0 ? void 0 : _c.publishedDate,
            },
        },
        books: data === null || data === void 0 ? void 0 : data.items.map((item) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            return ({
                title: (_a = item === null || item === void 0 ? void 0 : item.volumeInfo) === null || _a === void 0 ? void 0 : _a.title,
                subtitle: (_b = item === null || item === void 0 ? void 0 : item.volumeInfo) === null || _b === void 0 ? void 0 : _b.subtitle,
                authors: (_c = item === null || item === void 0 ? void 0 : item.volumeInfo) === null || _c === void 0 ? void 0 : _c.authors,
                imageLarge: (_e = (_d = item === null || item === void 0 ? void 0 : item.volumeInfo) === null || _d === void 0 ? void 0 : _d.imageLinks) === null || _e === void 0 ? void 0 : _e.thumbnail,
                image: (_g = (_f = item === null || item === void 0 ? void 0 : item.volumeInfo) === null || _f === void 0 ? void 0 : _f.imageLinks) === null || _g === void 0 ? void 0 : _g.smallThumbnail,
                preview: (_h = item === null || item === void 0 ? void 0 : item.volumeInfo) === null || _h === void 0 ? void 0 : _h.thumbnail,
                identifier: (_k = (_j = item === null || item === void 0 ? void 0 : item.volumeInfo) === null || _j === void 0 ? void 0 : _j.industryIdentifiers) === null || _k === void 0 ? void 0 : _k.map((m) => m.identifier),
            });
        }),
    };
    return formattedData;
};
app.get("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query, page, recordsPerPage } = req.query;
    const start = Date.now();
    const url = `${booksAPI}?q=${query}&startIndex=${page}&maxResults=${recordsPerPage}`;
    const { data } = yield axios_1.default.get(url);
    const finish = Date.now();
    const resData = formatResponse(data);
    res.send(Object.assign(Object.assign({}, resData), { reqResponseTime: (finish - start) / 1000 }));
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
