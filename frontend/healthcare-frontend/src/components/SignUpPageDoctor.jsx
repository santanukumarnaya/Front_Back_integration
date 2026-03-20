import axios from "axios";
import { useReducer } from "react"
import { useNavigate } from "react-router-dom";

const formState={
    name:"",
    email:"",
    password:"",
    confrPassword:"",
    role:"",
    department:"",
    error:{
        name:"",
        email:"",
        password:"",
        confrPassword:"",
        role:"",
        department:"",
    }
}

const handleFormState = (state, action) =>{
    switch(action.type){
        case "HANDLE_CHANGE": {
            const {field , value} = action.payload;

            return{
                ...state,
                [field]:value
            };
        }

        case "HANDLE_SUBMIT":{
            const {field, value} = action.payload;
            let err = "";

            if(field === "name"){
                if(!value || value[0]!==value[0].toUpperCase()){
                    err = "Name is reruired(First letter should be capital)";
                }
            }
            if(field === "email"){
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if(!value){
                    err ="Email is required";
                }
                if(!emailRegex.test(value)){
                    err= "Email is not valid";
                }
            }
            if(field === "password"){
                const passRegex = /^[A-Z](?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{7,}$/;
                if(!value){
                    err ="Password needed";
                }
                if(!passRegex.test(value)){
                    err = "Password should contain:\n1. One uppercase letter\n2. One number\n3. One special character";
                }
            }
            if(field === "cnfrPassword"){
                if(!value || value !== state.password){
                    err = "should be same as password";
                }
            }
            if(field ==="role"){
                if(!value){
                    err = "Role is required";
                }
            }
            if(field === "department"){
               if(!value){
                    err = "Department is required"
                }
            }
            return{
                ...state,
                [field]:value,
                error:{
                    ...state.error,
                    [field]:err
                }
            }
        }
        default:
            return state;
    }
};
export default function SignUpDoctor(){
    const [state , dispatch] = useReducer(handleFormState , formState);

    const navigate = useNavigate();

    const handleSubmit  = async(e) =>{
        e.preventDefault();

        dispatch({type:"HANDLE_SUBMIT", payload:{field:"name", value:state.name}});
        dispatch({type:"HANDLE_SUBMIT", payload:{field:"email", value:state.email}});
        dispatch({type:"HANDLE_SUBMIT", payload:{field:"password", value:state.password}});
        dispatch({type:"HANDLE_SUBMIT", payload:{field:"confrPassword", value:state.confrPassword}});
        dispatch({type:"HANDLE_SUBMIT", payload:{field:"role", value:state.role}});
        dispatch({type:"HANDLE_SUBMIT", payload:{field:"department", value:state.department}});

        const signUpDataDoc = {
            name: state.name,
            email: state.email,
            password: state.password,
            role: state.role,
            department: state.department
        }

        try{
            const response = await axios.post("http://localhost:5000/api/user/create", signUpDataDoc);
            localStorage.setItem("token",response.data.token);
            localStorage.setItem("role",response.data.data.role);

            const token = response.data.token;
            console.log("SignUp succesfull");

            if(token){
                navigate("/doctorPage");
            }
        }catch(error){
            console.error(error);
            alert("Error"); 
        }
    };


return(
    <div>
        <form onSubmit={handleSubmit}>
            <label>Name<span style={{color:"red"}}>*</span> </label>
            <input type="text" 
            onChange={(e)=> dispatch({type:"HANDLE_CHANGE", payload:{field: "name", value: e.target.value}})} />
            {state.error.name && ( <p style={{color:"red"}}>{state.error.name}</p> )}

            <label>Email<span style={{color:"red"}}>*</span></label>
            <input type="text" 
            onChange={(e)=> dispatch({type:"HANDLE_CHANGE", payload:{field: "email", value: e.target.value}})}/>
            {state.error.email && ( <p style={{color:"red"}}>{state.error.email}</p> )}

            <label>Password<span style={{color:"red"}}>*</span></label>
            <input type="text" 
            onChange={(e)=> dispatch({type:"HANDLE_CHANGE", payload:{field: "password", value: e.target.value}})}/>
            {state.error.password && ( <p style={{color:"red"}}>{state.error.password}</p> )}

            <label>Confirm Password<span style={{color:"red"}}>*</span></label>
            <input type="text" 
            onChange={(e)=> dispatch({type:"HANDLE_CHANGE", payload:{field: "confrPassword", value: e.target.value}})}/>
            {state.error.confrPassword && ( <p style={{color:"red"}}>{state.error.confrPassword}</p> )}

            <label>Role<span style={{color:"red"}}>*</span></label>
            <select itemType="text"
            onChange={(e)=> dispatch({type:"HANDLE_CHANGE", payload:{field: "role", value: e.target.value}})}>
                <option>doctor</option>
            </select>
            {state.error.role && ( <p style={{color:"red"}}>{state.error.role}</p> )}

            <label>Department<span style={{color:"red"}}>*</span></label>
            <select itemType="text" 
            onChange={(e)=> dispatch({type:"HANDLE_CHANGE", payload:{field: "department", value: e.target.value}})}>
                    <option>Selecct department</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Gastroenterology">Gastroenterology</option>
                    <option value="Dermatology">Dermatology</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Gynecology">Gynecology</option>
                    <option value="Oncology">Oncology</option>
                    <option value="Urology">Urology</option>
                    <option value="Endocrinology">Endocrinology</option>
                    <option value="Nephrology">Nephrology</option>
                    <option value="Pulmonology">Pulmonology</option>
                    <option value="Psychiatry">Psychiatry</option>
                    <option value="Ophthalmology">Ophthalmology</option>
                    <option value="ENT (Ear Nose Throat)">ENT (Ear Nose Throat)</option>
                    <option value="General Medicine">General Medicine</option>
                    <option value="Radiology">Radiology</option>
                    <option value="Anesthesiology">Anesthesiology</option>
                    <option value="Rheumatology">Rheumatology</option>
                    <option value="Hematology">Hematology</option>
            </select>
            {state.error.department && ( <p style={{color:"red"}}>{state.error.department}</p> )}

            <button type="submit">SUBMIT</button>
        </form>
    </div>
)
}



