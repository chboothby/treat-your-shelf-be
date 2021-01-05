const apiRouter = require("express").Router();
const booksRouter = require("./booksRouter");
const usersRouter = require("./usersRouter");

apiRouter.use("/users", usersRouter);
apiRouter.use("/books", booksRouter);

module.exports = apiRouter;
