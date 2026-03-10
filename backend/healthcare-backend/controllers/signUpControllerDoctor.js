const fs = require("fs");
const path = require("path");
const {v4: uuidv4} = require("uuid");

exports.createSignUpDoctor = (req, res)=>{
    try{

        const file_path = path.join(__dirname, "../data/user.json");

        const newSignUpDoctor = {
            id: uuidv4(),
            name: req.body.name,
            eamil:req.body.eamil,
            password:req.body.password,
            role:req.body.role,
            department: req.body.department
        }

        let user = [];

        if(fs.existsSync(file_path)){
            user = JSON.parse(fs.readFileSync(file_path, "utf-8"));
        }

        user.push(newSignUpDoctor);

        fs.writeFileSync(file_path, JSON.stringify(user, null, 2));

        res.status(201).json({
            message: "SignUp details saved successfully",
            data: newSignUpDoctor
        });
    }catch(error){
        req.status(500).json({error: error.message});
    }
}