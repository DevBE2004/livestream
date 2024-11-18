const { notFound, errHandler } = require("../middlewares/errorHandling");
const auth = require("./auth");
const user = require("./user");
const initRoute = (app) => {
  app.use("/auth", auth);
  app.use("/user", user);

  app.use(notFound);
  app.use(errHandler);
};

module.exports = initRoute;
