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

module.exports = usersRouter;
