const JWT = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  verifyToken: (req, res, next) => {
    const tokenRoot = req.headers.authorization.startsWith("Bearer");
    if (tokenRoot) {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) throw new Error("không có token");
      console.log(token)
      JWT.verify(token, process.env.SECRET_KEY, (err, decode) => {
        if (err) throw new Error("token hết hạn hoặc sai");
        req.user = decode;
      });
    } else throw new Error("token không hợp lệ");
    next();
  },
};
