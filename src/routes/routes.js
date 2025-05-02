const auth = require("./auth.routes");
const character = require("./character.routes");

const routes = (app) => {
  app.use("/auth", auth);
  app.use("/characters", character);
  app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
  });
};

module.exports = routes;
