const express = require("express");
const {completedAppointments} = require("../controllers/completedAppointmentsController");

const route = express.Router();

route.post( "/completedReq",completedAppointments);

module.exports = route;