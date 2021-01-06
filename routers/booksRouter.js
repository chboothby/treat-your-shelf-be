const { getAllBooks } = require("../controllers/books");
const booksRouter = require("express").Router();

booksRouter.route("/").get(getAllBooks);

module.exports = booksRouter;
