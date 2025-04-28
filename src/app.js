const express = require("express");
const routes = require("./routes/routes");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5050",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
routes(app);

app.get("/", (req, res) => {
  res.send("API is running");
});

module.exports = app;
