const expressAsyncHandler = require("express-async-handler");
const User = require("../models/user");

module.exports = {
  getMe: expressAsyncHandler(async (req, res) => {
    const { uid } = req.user;
    const me = await User.findById(uid).select("-password");
    return res.json({
      success: Boolean(me) ? true : false,
      mes: Boolean(me) ? "thành công." : "thất bại.",
      me,
    });
  }),
};
