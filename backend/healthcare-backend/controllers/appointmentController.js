const fs = require("fs");
const path = require("path");
const {v4: uuidv4} = require("uuid");
exports.createAppointment = (req, res) => {
  try {

    const filePath = path.join(__dirname, "../data/appointments.json");

    const newAppointment = {
      appointmentId: uuidv4(),
      patientId: req.body.patientId,
      doctorId: req.body.doctorId,
      patientName:req.body.name,
      age:req.body.age,
      contact:req.body.phone,
      problem:req.body.problem,
      symptoms:req.body.symptoms,
      doctorName:req.body.doctor,
      department:req.body.department
    };

    let appointments = [];

    if (fs.existsSync(filePath)) {
      appointments = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }

    appointments.push(newAppointment);

    fs.writeFileSync(filePath, JSON.stringify(appointments, null, 2));

    res.status(201).json({
      message: "Appointment saved successfully",
      data: newAppointment
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};