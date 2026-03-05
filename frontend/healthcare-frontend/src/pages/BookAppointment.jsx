import { useState } from "react";
import FormValidate from "../components/FormValidate";
import SubmitPage from "./SubmitPage";
export default function  BookAppointment(){
    const initState = {
        personalInfo:{name:"", age:"", phone:"", email:""},
        reasons:{ problem:"", symptoms:""}        
    }
    const [details, setDetails] = useState(initState);
    const [page, setPage] = useState(0);
    const [errMsg, setErrMsg] = useState({});

    // const hanldeChange = (state, field, value) =>{
    //     setDetails(prev=>(
    //         {...prev,
    //             [section]:{
    //                 ...prev[state], [field]:value
    //             }
    //         }
    //     ))
    // };

const handleChange = (section, field, value) => {
  setDetails(prev => ({
    ...prev,
    [section]: {
      ...prev[section],
      [field]: value
    }
  }));
};
//  VALIDATIONS AND ALL
    const validateFirst = () =>{
        // e.preventDefault();
        const err = {};
        const{name, age, phone, email} = details.personalInfo;

        if(!name || name[0]!==name[0].toUpperCase()){
            err.name ="please enter valid email";
        }
        if(!age){
            err.age ="Enter Age";
        }
        if(!email){
            err.email = "Email Required";
        }
        if(phone.length!==10){
            err.phone = "Enter Valid Phone Number";
        }
        return err;
    };
    
    const validateSecond = () =>{
        // e.preventDefault();
        const err ={};

        const{problem, symptoms} = details.reasons;

        if(!problem){
            err.problem = "Reason required";
        }
        if(!symptoms){
            err.symptoms ="Required Field";
        }
    };


    const totalPage = 3;

    const nextButton = () =>{
        let errNxt ={};
        if(page===1) errNxt = validateFirst();
        if(page ===2) errNxt = validateSecond();

        if(Object.keys(errNxt).length===0){
            setPage((prev)=>prev+1);
        }else{
            setErrMsg(errNxt);
        }
    };
    
    const backButton = () =>{
        if(page===2){
            setPage((prev)=>prev-1);
        }
    };

    const firstForm =[
        {name:"Name*", type:"text", value:details.personalInfo.name , 
            onchange:(value)=> handleChange("personalInfo", "name",value), placeholder:"Enter Name"},
        {name:"Age*", type:"text", value:details.personalInfo.age , 
            onchange: (value)=> handleChange("personalInfo", "age",value) , placeholder:"Age"},
        {name:"Email*", type:"text", value: details.personalInfo.email, 
            onchange: (value)=> handleChange("personalInfo", "email",value) , placeholder:"Enter Email"},
        {name:"Phone*", type:"text", value: details.personalInfo.phone, 
            onchange: (value)=> handleChange("personalInfo", "phone",value), placeholder:"Enter contact no."}
    ];

    const secondForm =[
        {name:"Problem*", type:"text", value: details.reasons.problem, 
            onchange: (value)=> handleChange("reasons", "problem",value), placeholder:"What's the Problem?"},
        {name:"Symptoms*", type:"text", value: details.reasons.symptoms, 
            onchange: (value)=> handleChange("reasons", "symptoms",value), placeholder:"Symptoms are?"}
    ]
return(
    <div>
        {page===1 && (
            <FormValidate data={firstForm} error={errMsg} backClick={backButton} nextClick={nextButton}/>
        )}
        {page===2 &&(
            <FormValidate data={secondForm} error={errMsg} backClick={backButton} nextClick={nextButton}/>
        )}
        {page===3 && (
            <SubmitPage data={details} setData={setDetails} onSubmit={handleSubmit}/>
        )}
    </div>
)
}
