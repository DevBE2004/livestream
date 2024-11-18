const express = require("express");
const cors = require("cors");
const initRoute = require("./routes");
require("dotenv").config();
const { dbconneted } = require("./configs/dbconneted");

const port = process.env.PORT || 8888;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    methods: ["POST", "PUT", "GET", "DELETE"],
    origin: process.env.CLIENT_URL,
  })
);

dbconneted();

initRoute(app);

app.listen(port, () => {
  console.log("server on " + port + "   http://localhost:" + port);
});
