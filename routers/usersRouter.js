const usersRouter = require("express").Router();
const { getUserById, addNewUser } = require("../controllers/users");

usersRouter.route("/").post(addNewUser);
usersRouter.route("/:user_id").get(getUserById);

module.exports = usersRouter;
