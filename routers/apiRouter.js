const apiRouter = require("express").Router();
const booksRouter = require("./booksRouter");
const usersRouter = require("./usersRouter");
const fs = require("fs").promises;

apiRouter
  .route("/")
  .get((req, res, next) => {
    return fs
      .readFile("endpoints.json", "utf-8")
      .then((API) => {
        res.status(200).send({ API: JSON.parse(API) });
      })
      .catch(next);
  })
  .all(send405);

apiRouter.use("/users", usersRouter);
apiRouter.use("/books", booksRouter);

module.exports = apiRouter;
