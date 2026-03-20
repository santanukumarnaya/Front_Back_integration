const express = require("express");

const {updateAppointment} = require ("../controllers/updateAppointmentController.js");

const route = express.Router();

route.post("/update", updateAppointment);

module.exports = route;