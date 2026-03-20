const fs = require("fs");
const path = require("path");
// const jwt = require("jsonwebtoken");

exports.searchDoctor = async(req, res) => {
    try{
        const {department} = req.body;

        if(!department){
            return res.status(400).json({message:"Doctor Details required"});
        }

        const file_path = path.join(__dirname, "../data/user.json");

        const doctors = JSON.parse(fs.readFileSync(file_path, "utf-8"));
        
        const  doctor = doctors.filter(
            (u)=> u.role==="doctor" && u.department === department
        );

        if(doctor.length === 0){
            return res.status(400).json({message:"Doctor is not associated"});
        }

        // const token = jwt.sign(
        //     {
        //         id: doctor.id, 
        //         role: doctor.role, 
        //         name:doctor.name, 
        //         departmnet:doctor.department},
        //     process.env.JWT_SEC,
        //     {expiresIn: "1d"}
        // );
        const safeDoctors = doctor.map((doc) => ({
            id: doc.id,
            name: doc.name,
            department: doc.department,
            role: doc.role
        }));

        res.json({
            message: "Doctor found",
            
            allDoctor:safeDoctors
        });
    }catch(error){
        res.status(500).json({error: error.message});
    }
};