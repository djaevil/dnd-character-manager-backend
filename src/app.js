const express = require("express");
const routes = require("./routes/routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
routes(app);

app.get("/", (req, res) => {
  res.send("API is running");
});

module.exports = app;
