const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const registerCheck = require("../middlewares/registerCheck");
const userController = new UserController();

router.post("/logout", (req, res) => userController.logout(req, res));

router.post("/login", (req, res) => userController.login(req, res));

router.post("/register",  (req, res) => userController.register(req, res));

router.get("/:username", (req, res) => userController.findByUsername(req, res));

router.get("/", (req, res) => {
  console.log(req.cookies);
});

router.get("/users/:username", (req, res) =>
  userController.findByUsername(req, res)
);

module.exports = router;
