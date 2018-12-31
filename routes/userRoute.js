const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/login", userController.getLoginPage);

router.get("/register", userController.getRegisterPage);

router.post("/register", userController.register);

module.exports = router;
