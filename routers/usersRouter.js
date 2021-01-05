const usersRouter = require("express").Router();
const {
  getUserById,
  addNewUser,
  deleteUser,
  updateUser,
} = require("../controllers/users");

usersRouter.route("/").post(addNewUser);
usersRouter
  .route("/:user_id")
  .get(getUserById)
  .delete(deleteUser)
  .patch(updateUser);

module.exports = usersRouter;
