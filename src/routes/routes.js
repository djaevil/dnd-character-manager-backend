const auth = require("./auth.routes");

const routes = (app) => {
  app.use("/auth", auth);
};

module.exports = routes;
