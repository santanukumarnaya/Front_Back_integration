const express = require("express");
const {searchDoctor} = require("../controllers/searchDocController");

const router = express.Router();

router.post("/search", searchDoctor);

module.exports = router;