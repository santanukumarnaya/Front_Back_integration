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
                if(!value){
                    error = "Please select Role";
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

                localStorage.setItem(response.data.token);
                localStorage.setItem(response.data.data.role);
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

                <label>Name<span style={{color:"red"}}>*</span></label>
                <input type="text" 
                onChange={(e)=>dispatch({type:"HANDLE_CHANGE", payload:{field: "name", value: e.target.value}})} 
                className="signUp-input"/>
                {state.err.name && (<p style={{color:"red"}}>{state.err.name}</p>) }

                <label>Email<span style={{color:"red"}}>*</span></label>
                <input type="text" 
                onChange={(e)=>dispatch({type:"HANDLE_CHANGE", payload:{field: "email", value: e.target.value}})} 
                className="signUp-input"/>
                {state.err.email && (<p style={{color:"red"}}>{state.err.email}</p>) }
                
                <label>Password<span style={{color:"red"}}>*</span></label>
                <input type="text" 
                onChange={(e)=>dispatch({type:"HANDLE_CHANGE", payload:{field: "password", value: e.target.value}})} 
                className="signUp-input"/>
                {state.err.password && (<p style={{color:"red"}}>{state.err.password}</p>) }
                
                <label>Confirm Password<span style={{color:"red"}}>*</span></label>
                <input type="text" 
                onChange={(e)=>dispatch({type:"HANDLE_CHANGE", payload:{field: "confrPassword", value: e.target.value}})} 
                className="signUp-input"/>
                {state.err.confirm && (<p style={{color:"red"}}>{state.err.confirm}</p>) }
                
                <label>Role<span style={{color:"red"}}>*</span></label>
                <select itemType="text" 
                onChange={(e)=>dispatch({type:"HANDLE_CHANGE", payload:{field: "role", value: e.target.value}})} 
                className="signUp-input">
                    <option value="">Patient</option>
                    <option value="">Doctor</option>
                </select>
                {state.err.role && (<p style={{color:"red"}}>{state.err.role}</p>)}
                {/* without parentesis is fine if there is single line but for multi lines parenthesis is needed */}
            </div>
        </form>
    </div>
)
}

