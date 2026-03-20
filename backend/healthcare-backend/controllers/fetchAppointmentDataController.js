const fs = require("fs");
const path = require('path');

exports.fetchAppointment = async(req, res)=>{

    try{
        const file_path = path.join(__dirname, "../data/appointments.json");

        const appointmentDeatils = JSON.parse(fs.readFileSync(file_path,"utf-8"));

        if(appointmentDeatils.length ===0){
            return res.status(400).json({message: "No Appoinment yet"});
        }

        // const appointments = appointmentDeatils.map((apt)=>({
            
        // }))
        res.json({
            message: "Details fetched",

            appointmentDeatils
        })
    }catch(error){
        res.status(500).json({error: error.message});
    }
}