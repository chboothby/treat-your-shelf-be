const { getAllBooks, getBookById } = require("../controllers/books");
const booksRouter = require("express").Router();

booksRouter.route("/").get(getAllBooks);
booksRouter.route("/:book_id").get(getBookById);

module.exports = booksRouter;
