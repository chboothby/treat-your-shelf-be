const express = require("express");
const apiRouter = require("./routers/apiRouter");
const app = express();
const cors = require("cors");
const {
  handleCustomErrors,
  handlePSQLErrors,
  handleInternalErrors,
  send404,
} = require("./controllers/errors");

app.use(cors());
app.use(express.json());
app.use("/api", apiRouter);

app.use(handleCustomErrors);
app.use(handlePSQLErrors);
app.use(handleInternalErrors);
app.route("/*").all(send404);

module.exports = app;
