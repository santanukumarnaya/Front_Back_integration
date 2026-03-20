const fs = require("fs");
const path = require("path");

exports.completedAppointments = (req, res) =>{
    try{
        
        const appointmentPath = path.join(__dirname, "../data/appointments.json");
        const historyPath = path.join(__dirname, "../data/appointmentHistory.json");

        let appointment = JSON.parse(fs.readFileSync(appointmentPath, "utf-8"));

        const index = appointment.findIndex((item)=>item.id === req.body.id);

        if(index === -1){
            return res.status(404).json({message: "Appointment not found"}) ;
        };

        const [removedAppointment] = appointment.splice(index, 1);

        let completed = JSON.parse(fs.readFileSync(historyPath, "utf-8"));

        completed.push(removedAppointment);

        fs.writeFileSync(appointmentPath, JSON.stringify(appointment, null, 2));
        fs.writeFileSync(historyPath, JSON.stringify(completed, null, 2));

        res.json({message: "Stored to history"});

    }catch(error){
        return res.status(500).json({error: error.message});
    }
};