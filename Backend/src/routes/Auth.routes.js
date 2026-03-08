const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/Auth.Controller");
router.post("/auth/signup", AuthController.signup);
router.post("/auth/login", AuthController.login);

module.exports = router;