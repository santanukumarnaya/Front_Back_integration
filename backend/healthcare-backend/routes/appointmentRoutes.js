const express = require("express");
const { createAppointment } = require("../controllers/appointmentController");
const protect = require("../middleware/authMiddleware");

const route = express.Router();

route.post("/create", protect, createAppointment);

module.exports = route;
