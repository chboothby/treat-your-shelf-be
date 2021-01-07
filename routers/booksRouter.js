const {
  getAllBooks,
  getBookById,
  updateBook,
  deleteBookById,
} = require("../controllers/books");
const { send405 } = require("../controllers/errors");
const booksRouter = require("express").Router();

booksRouter.route("/").get(getAllBooks).all(send405);
booksRouter
  .route("/:book_id")
  .get(getBookById)
  .patch(updateBook)
  .delete(deleteBookById)
  .all(send405);

module.exports = booksRouter;
