import axios from "axios";
import { useState, useReducer } from "react";

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
            if(field==="Password"){
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
                    error = "Required"
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
            id: Date.now(),
            name:state.name,
            email:state.email,
            password:state.password,
            role:state.role
            };

            const response = await axios.post("")
    };
return
}