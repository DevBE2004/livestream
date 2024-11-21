const expressAsyncHandler = require("express-async-handler");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const { sendEmail } = require("../utils/sendEmail");
const { generateCode } = require("../utils/generateCode");

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
      { id: user._id, role: user.role },
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
  forgotPassword: expressAsyncHandler(async (req, res) => {
    const { email } = req.body;
    const recoveryCode = generateCode();
    const user = await User.findOne({ email });

    if (!user) throw new Error("Người dùng không tồn tại.");

    try {
      await User.updateOne({ email }, { forgotPasswordCode: null });

      const response = await sendEmail(
        email,
        "Khôi phục mật khẩu!",
        `
          <p>Xin chào ${email},</p>
          <p>Bạn đã yêu cầu khôi phục mật khẩu cho tài khoản của mình.</p>
          <p>Vui lòng sử dụng mã dưới đây để đặt lại mật khẩu của bạn:</p>
          <p style="padding: 12px; border-left: 4px solid #d0d0d0; font-weight: bold; font-size: 16px;">
            Mã khôi phục: ${recoveryCode}
          </p>
          <p>
            Nếu bạn không yêu cầu khôi phục mật khẩu, vui lòng bỏ qua email này.<br>
            Trân trọng,<br>Nhóm của chúng tôi
          </p>
        `
      );

      if (Boolean(response)) {
        await User.updateOne(
          { email },
          { forgotPasswordCode: recoveryCode },
          { new: true }
        );

        setTimeout(async () => {
          await User.updateOne({ email }, { forgotPasswordCode: null });
        }, 5 * 60 * 1000);

        return res.json({
          success: true,
          message: "Vui lòng kiểm tra email của bạn.",
        });
      } else {
        throw new Error("Đã xảy ra lỗi khi gửi email.");
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: error.message || "Vui lòng thử lại.",
      });
    }
  }),

  verifyForgotPassword: expressAsyncHandler(async (req, res) => {
    const { code, email } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error("Người dùng không tồn tại.");
    const checkCode = user.forgotPasswordCode == code;
    return res.json({
      success: Boolean(checkCode) ? true : false,
      mes: Boolean(checkCode)
        ? "xác thực thành công."
        : "mã xác thực không đúng hoặc đã hết hạn(5 phút).",
    });
  }),

  resetPassword: expressAsyncHandler(async (req, res) => {
    const { newPassword, email } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error("Người dùng không tồn tại.");
    const response = await User.updateOne(
      { email },
      { password: newPassword },
      { new: true }
    );
    return res.json({
      success: Boolean(response) ? true : false,
      mes: Boolean(response)
        ? "thay đổi mật khẩu thành công."
        : "đã xảy ra một lỗi. vui lòng thử lại.",
    });
  }),
};
