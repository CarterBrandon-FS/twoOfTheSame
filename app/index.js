const express = require("express");
const app = express();
const morgan = require("morgan");
const routeHandler = require("./routes/Index");

// Middleware
app.use(morgan("dev"));
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.status(200).json({ message: "API is up and running", success: true });
});

// Mount routes
app.use("/api", routeHandler);

module.exports = app;
