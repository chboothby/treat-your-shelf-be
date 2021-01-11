const usersRouter = require("express").Router();
const { send405 } = require("../controllers/errors");
const {
  getUserById,
  addNewUser,
  deleteUser,
  updateUser,
  getAllUsersBooks,
  addNewBook,
} = require("../controllers/users");
const {
  getAllUsersExchanges,
  addExchangeRequest,
  updateExchangeRequest,
} = require("../controllers/exchanges");
const { patch } = require("./booksRouter");

usersRouter.route("/").post(addNewUser).all(send405);
usersRouter
  .route("/:user_id")
  .get(getUserById)
  .delete(deleteUser)
  .patch(updateUser)
  .all(send405);
usersRouter
  .route("/:user_id/books")
  .get(getAllUsersBooks)
  .post(addNewBook)
  .all(send405);
usersRouter
  .route("/:user_id/exchanges")
  .get(getAllUsersExchanges)
  .post(addExchangeRequest);
usersRouter
  .route("/:user_id/exchanges/:exchange_id")
  .patch(updateExchangeRequest);
module.exports = usersRouter;
