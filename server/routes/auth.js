const router = require("express").Router();
const ctrl = require("../controllers/auth");

router.post("/sign-up", ctrl.signUp);
router.post("/sign-in", ctrl.signIn);
router.post("/forgot-password", ctrl.forgotPassword);
router.post("/verify-forgot-password", ctrl.verifyForgotPassword);
router.post("/reset-password", ctrl.resetPassword);

module.exports = router;
