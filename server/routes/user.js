const router = require("express").Router();
const ctrl = require("../controllers/user");
const { verifyToken } = require("../middlewares/verifyToken");

router.get("/me", verifyToken, ctrl.getMe);

module.exports = router;
