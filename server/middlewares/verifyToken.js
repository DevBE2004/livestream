const JWT = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  verifyToken: (req, res, next) => {
    const tokenRoot = req.headers.authorization?.startsWith("Bearer");
    if (tokenRoot) {
      const token = req.headers.authorization.split(" ")[1];
      if (!token)
        return res.status(401).json({ success: false, mes: "không có token" });

      JWT.verify(token, process.env.SECRET_KEY, (err, decode) => {
        if (err)
          return res
            .status(401)
            .json({ success: false, mes: "token hết hạn hoặc sai" });
        req.user = decode; 
        next(); 
      });
    } else {
      return res
        .status(401)
        .json({ success: false, mes: "token không hợp lệ" });
    }
  },
};
