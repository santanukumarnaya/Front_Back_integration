const fs = require("fs");
const path = require("path");

exports.updateAppointment=(req, res)=>{
    try{
        
        const file_path = path.join(__dirname,"../data/appointments.json");

        const prevAppointment = JSON.parse(fs.readFileSync(file_path, "utf-8"));

        const appointmentIndex = prevAppointment.findIndex((data)=>data.appointmentId === req.body.id);

        if(appointmentIndex){
            return res.status(404).json({message:"Appointment not found"});
        }
        
        prevAppointment[appointmentIndex] = {
            ...prevAppointment[appointmentIndex],
            ...req.body
        };

        fs.writeFileSync(file_path, JSON.stringify(prevAppointment, null, 2));

        res.json({message:"Updated Appointment", data: prevAppointment[appointmentIndex]});
        
    }catch(error){
        res.status(500).json({message:"Server Error", error});
    }
};