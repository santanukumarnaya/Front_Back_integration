import { useState } from "react";
import ReForm from "./ReForm";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function LoginPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin =async()=>{
        try{
            const response = await axios.post("http://localhost:5000/api/auth/login", {email, password});
            
            localStorage.setItem("token", response.data.token);
            console.log(response.data);

            const role = response.data.user.role;
            if(role==="doctor"){
                navigate("/doctorPage");
                console.log("fetching doctor")
            }else if(role==="patient"){
                navigate("/pateintsPage");
                console.log("fetching patient");
            }else{
                console.log("Something odd is happening");
            }
        }catch(error){
            console.log(error.response);
            // alert("Invalid credentials");
        }
    };

    const formData =[
        {
            name:"Email",
            type:"email",
            placeholder:"Enter Email",
            value: email,
            onChange: setEmail
        },
        {
            name:"Password",
            type:"password",
            placeholder:"Enter password",
            value: password,
            onChange: setPassword
        }
    ]
return(
    <div>
        <ReForm  data={formData} onSubmit={handleLogin}/>
    </div>
)
}