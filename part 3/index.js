const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')
const morgan = require("morgan");
app.use(morgan("tiny"));

morgan.token("body", (req) => {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }

  return "";
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
