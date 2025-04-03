const mongoose = require("mongoose");
const logger = require("./utils/logger");
const config = require("./utils/config");
const cors = require("cors");
const express = require("express");
const app = express();
const blogsRouter = require("./controllers/blogs.js");
const usersRouter = require("./controllers/users.js");
const loginRouter = require("./controllers/login.js");
const middleware = require("./utils/middleware.js");

mongoose.set("strictQuery", false);

logger.info("connecting to", config.MONGODB_URI);

const mongoUrl =
  "mongodb+srv://moya04ramiro:NxZGhS0zuDczpKYh@phonebookapi.nfk4x.mongodb.net/?retryWrites=true&w=majority&appName=phonebookapi";
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
