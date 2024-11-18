const expressAsyncHandler = require("express-async-handler");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

module.exports = {
  signUp: expressAsyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.findOne({ email }).select("_id");
    if (user) throw new Error("Người dùng dã tồn tại.");
    const newuser = await User.create({ email, password, username });
    return res.json({
      success: Boolean(newuser) ? true : false,
      mes: Boolean(newuser)
        ? "tạo người dùng thành công."
        : "tạo người dùng thất bại vui lòng thử lại.",
    });
  }),
  signIn: expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error("Người dùng không tồn tại.");
    const checkPassword = bcrypt.compare(password, user.password);
    if (!checkPassword)
      throw new Error("tài khoản hoặc mật khẩu sai. vui lòng thử lại.");
    const accesstoken = JWT.sign(
      { uid: user._id, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "3d" }
    );
    return res.json({
      success: Boolean(checkPassword) ? true : false,
      mes: Boolean(checkPassword)
        ? "đăng nhập thành công."
        : "đã xảy ra một lỗi. vui lòng thử lại.",
      accesstoken,
    });
  }),
};
