require("dotenv").config();
const express = require("express");
// const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const signUpRoutes = require("./routes/signUpRoutes")
const createSignUpDoctor = require("./routes/signUpDoctorRoutes");
const searchDoctorRoutes =  require("./routes/searchDocRoutes");
const fetchAppointmentData = require("./routes/fetchAppointmentRoutes");


const completedApointments = require ("./routes/completedAppointmentsRoutes");
const updateAppointment = require("./routes/updateAppointmentRoute");
const app = express();

app.use(cors());
app.use(express.json());

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("DB Connected"))
//   .catch(err => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/user", signUpRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/searchDoctor",searchDoctorRoutes);
app.use("/api/signUpDoctor", createSignUpDoctor);
app.use("/api/getAppoinmentData", fetchAppointmentData);
app.use("/api/deletedOrComplte", completedApointments);
app.use("/api/updateAppointment", updateAppointment);
// app.use("/api/auth", authRoutes);
// app.use("/api/appointments", appointmentRoutes);
app.listen(5000, () => console.log("Server running on port 5000"));