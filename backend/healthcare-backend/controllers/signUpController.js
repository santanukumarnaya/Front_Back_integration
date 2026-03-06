const fs = require("fs");
const path = require("path");

exports.createSignUp = (req, res)=>{
    try{
        const filePath = path.json(__dirname, "../data/user.json");

        const newSignUp = req.body;

        let user = [];

        if(fs.existsSync(filePath)){
            user = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        }

        user.push(newSignUp);

        fs.writeFileSync(filePath, JSON.stringify(user, null, 2));
        // null → no custom replacer 2 → indent JSON with 2 spaces

        res.status(201).json({
            message:"SignUp details saved successfully",
            data: newSignUp
        });
    }catch(error){
        res.status(500).json({error: error.message});
    }
}