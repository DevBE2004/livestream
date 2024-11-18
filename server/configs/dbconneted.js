const mongoose = require("mongoose");

module.exports = {
  dbconneted: () => {
    try {
      mongoose
        .connect(`mongodb://127.0.0.1:27017/${process.env.DBNAME}`)
        .then(() => {
          console.log("db connected successfully.");
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error + "at config/dbconnected.");
    }
  },
};