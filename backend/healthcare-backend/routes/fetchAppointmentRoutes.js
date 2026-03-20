const express= require("express");
const {fetchAppointment} = require("../controllers/fetchAppointmentDataController");

const route = express.Router();

route.post("/get", fetchAppointment);

module.exports = route;