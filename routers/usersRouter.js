const usersRouter = require("express").Router();
const {
  getUserById,
  addNewUser,
  deleteUser,
  updateUser,
  getAllUsersBooks,
  addNewBook,
} = require("../controllers/users");

usersRouter.route("/").post(addNewUser);
usersRouter
  .route("/:user_id")
  .get(getUserById)
  .delete(deleteUser)
  .patch(updateUser);
usersRouter.route("/:user_id/books").get(getAllUsersBooks).post(addNewBook);

module.exports = usersRouter;
