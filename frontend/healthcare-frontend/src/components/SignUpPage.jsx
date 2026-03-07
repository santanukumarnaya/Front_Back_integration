import axios from "axios";
import { useReducer } from "react";

const formState ={
    name:"",
    email:"",
    password:"",
    confrPassword:"",
    role:"",
    // submit:[],
    err:{
        name:"",
        email:"",
        password:"",
        confirm:"",
        role:"",
    }
}

const handelReducer = (state, action) =>{
    switch(action.type){
        case "HANDLE_CHANGE": {
            const { field, value } = action.payload;

            return {
                ...state,
                [field]: value
            };
        }
        case "HANDLE_SUBMIT":{
            
            const {field, value} = action.payload;
            let error="";

            if(field==="name"){
                if(!value || value[0]!==value[0].toUpperCase()){
                    error= "Enter Valid Name";
                } 
            }
            if(field==="email"){
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if(!emailRegex.test(value)){
                    error = "Enter valid email Id";
                }
            }
            if(field==="password"){
                const passRegex = /^[A-Z](?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{7,}$/;
                if(!value|| !passRegex.test(value)){
                    error = "Enter Valid Password[uppercase, symbol, number, min 8 character]"
                }
            }
            if(field === "confrPassword"){
                if(value!== state.password){
                    error = "Should be same as password";
                }
            }
            if(field === "role"){
                if(!role){
                    error = "Please select One";
                }
            }
            return {
                ...state,
                [field]: value,
                err: {
                ...state.err,
                [field]: error
            }
         };
        }
        default:
            return state;

    }
};
export default function SignUpPage(){
    const [state, dispatch] = useReducer(handelReducer, formState);

    const handlePost = async() =>{
            const signUpData = {
            name:state.name,
            email:state.email,
            password:state.password,
            role:state.role.toLowerCase()
            };
            
            try{
                const response = await axios.post(
                    "http://localhost:5000/api/user/create",
                signUpData);

                alert("Signed up Succesfully");

            }catch(error){
                console.error(error);
                alert("Error");
            }
    };
return(
    <div>
        <form onSubmit={handlePost}>
            <div>
                <label>Name*</label>
                <input type="text" onChange={()=>dispatch({type:"HANDLE_CHANGE"})}/>
                {state.err.name && <p style={{color:"red"}}>{state.err.name}</p> }
                <label>Email</label>
                <input type="text" onChange={()=>dispatch({type:"HANDLE_CHANGE"})} />
                {state.err.email && <p style={{color:"red"}}>{state.err.email}</p> }
                <label>Password*</label>
                <input type="text" onChange={()=>dispatch({type:"HANDLE_CHANGE"})} />
                {state.err.password && <p style={{color:"red"}}>{state.err.password}</p> }
                <label>Confirm Password*</label>
                <input type="text" onChange={()=>dispatch({type:"HANDLE_CHANGE"})}/>
                {state.err.confirm && <p style={{color:"red"}}>{state.err.confirm}</p> }
                <label>Role</label>
                <select name="" id="" onChange={()=>dispatch({type:"HANDLE_CHANGE"})}>
                    <option value="">Patient</option>
                    <option value="">Doctor</option>
                </select>
                {state.err.role && <p style={{color:"red"}}>{state.err.role}</p> }
            </div>
        </form>
    </div>
)
}