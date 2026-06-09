const express = require("express");

const app = express();

const logger = require("./middleware/logging.middleware");
const scheduleRoutes = require("./routes/schedule.routes");

app.use(express.json());

app.use(logger);

app.use("/api", scheduleRoutes);

module.exports = app;