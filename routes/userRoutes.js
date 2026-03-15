const express = require("express");
const router = express.Router();
const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const debuger = require("debug")("development:userRoutes");



router.use(cookieParser());


module.exports = router;
