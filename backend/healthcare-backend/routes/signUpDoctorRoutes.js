const express = require("express");
const {createSignUpDoctor} = require("../controllers/signUpControllerDoctor");

const router = express.Router();

router.post("/search", createSignUpDoctor);

module.exports = router;