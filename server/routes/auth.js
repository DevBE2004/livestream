const router = require("express").Router();
const ctrl = require("../controllers/auth");

router.post("/sign-up", ctrl.signUp);
router.post("/sign-in", ctrl.signIn);

module.exports = router;
