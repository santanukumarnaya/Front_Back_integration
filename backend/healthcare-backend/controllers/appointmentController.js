const fs = require("fs");
const path = require("path");

exports.createAppointment = (req, res) => {
  try {

    const filePath = path.join(__dirname, "../data/appointments.json");

    const newAppointment = req.body;

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