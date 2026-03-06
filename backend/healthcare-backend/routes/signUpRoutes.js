const express = require("express");
const { createSignUp } = require("../controllers/signUpController");
const { model } = require("mongoose");

const router = express.Router();

router.post("/create", createSignUp);

module.exports = router;