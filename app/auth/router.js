const router = require("express").Router();
const authController = require("./controller");
const pasport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

pasport.use(new LocalStrategy({ usernameField: "email" }, authController.localStrategy));
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

module.exports = router;
