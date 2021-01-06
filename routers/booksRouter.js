const {
  getAllBooks,
  getBookById,
  updateBook,
  deleteBookById,
} = require("../controllers/books");
const booksRouter = require("express").Router();

booksRouter.route("/").get(getAllBooks);
booksRouter
  .route("/:book_id")
  .get(getBookById)
  .patch(updateBook)
  .delete(deleteBookById);

module.exports = booksRouter;
