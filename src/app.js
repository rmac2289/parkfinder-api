require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const usersRouter = require("./users/users-router");
const authRouter = require("./auth/auth-router");
const commentsRouter = require("./comments/comments-router");
const suggestionsRouter = require("./suggestions/suggestions-router");
const parks = require("../data");

const app = express();

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/suggestions", suggestionsRouter);
app.get("/api/data", (req, res) => {
  res.json(parks);
});

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
