const usersRouter = require("express").Router();
const { getUserById, addNewUser, deleteUser } = require("../controllers/users");

usersRouter.route("/").post(addNewUser);
usersRouter.route("/:user_id").get(getUserById).delete(deleteUser);

module.exports = usersRouter;
