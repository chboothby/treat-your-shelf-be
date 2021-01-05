const express = require("express");
const apiRouter = require("./routers/apiRouter");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/api", apiRouter);

module.exports = app;
