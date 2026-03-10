require("dotenv").config();
const express = require("express");
// const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const signUpRoutes = require("./routes/signUpRoutes")
const createSignUpDoctor = require("./routes/signUpDoctorRoutes");
// const signUpDoctorRoutes = require("./routes/si")
const app = express();

app.use(cors());
app.use(express.json());

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("DB Connected"))
//   .catch(err => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/user", signUpRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/searchDoctor",createSignUpDoctor);
// app.use("/api/auth", authRoutes);
// app.use("/api/appointments", appointmentRoutes);
app.listen(5000, () => console.log("Server running on port 5000"));