const fs = require("fs");
const path = require("path");
const {v4: uuidv4} = require("uuid");
const jwt = require("jsonwebtoken");

exports.createSignUp = (req, res)=>{
    try{
        const filePath = path.join(__dirname, "../data/user.json");

        const newSignUp = {
            id: uuidv4(),
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            role:req.body.role
        };

        let user = [];

        if(fs.existsSync(filePath)){
            user = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        }

        user.push(newSignUp);

        fs.writeFileSync(filePath, JSON.stringify(user, null, 2));
        // null → no custom replacer 2 → indent JSON with 2 spaces

        const token = jwt.sign(process.env.JWT_SECRET, {expiresIn: "1d"})

        res.status(201).json({
            message:"SignUp details saved successfully",
            token,
            data: newSignUp
        });
    }catch(error){
        res.status(500).json({error: error.message});
    }
}