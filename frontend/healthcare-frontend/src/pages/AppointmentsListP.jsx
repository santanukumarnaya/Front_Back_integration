import useAppointmentDetails from "../components/useAppointmentDetails"
import { useState,useReducer} from "react";
import ReForm from "../components/ReForm";
import axios from "axios";

const formState = {
    name:"",
    age:"",
    problem:"",
    symptoms:"",
    doctor:"",
    department:"",
    // locked: true,
    err:{
        name:"",
        age:"",
        problem:"",
        symptoms:"",
        doctor:"",
        department:"",
    }
};

const formReducer = (state, action)=>{
    switch(action.type){
        case "HANDLE_CHANGE":{
            const {field, value} = action.payload;
            
            // if(state.locked && (field === "doctor" || field === "department")){
            //     return state;
            // }
            // This is Optional and it would be less convinient or bigginer level

            if(field === "doctor" || field === "department"){
                return state;
            }
            return {
                ...state,
                [field]: value
            };            
        }

        case "HANDLE_SUBMIT":{

            let error = "";

            const {field, value}= action.payload;

            if(field === "name"){
                if(!value){
                    error = "This field should not be empty";
                }
            }
            if(field === "age" || !value){
                error = "This field should not be empty";
            }
            if(field === "problem" || !value){
                error = "This field should not be empty";
            }if(field === "symptoms" || !value){
                error = "This field should not be empty";
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
    };
};

export default function AppointmentListP(){
    const {fetchedData , isLoading} = useAppointmentDetails();

    const [state, dispatch] = useReducer(formReducer, formState);

    const [editInfo, setEditInfo] = useState(null);
    const pId = localStorage.getItem("id");
    const [showForm, setShowForm] = useState(false);

    // const filteredAppointments = fetchedData.filter((data)=> data.patientId.includes(pId));
    const filteredAppointments = fetchedData.filter((data)=> data.patientId === pId);
    
    const handleEdit =(id)=>{
        setEditInfo(id);   
    };  

    const handleDataEdit = (data) =>{
        setShowForm(true);
        dispatch({type:"HANDLE_CHANGE", payload:{field:"name", value:data.patientName}});
        dispatch({type:"HANDLE_CHANGE", payload:{field:"age", value:data.age}});
        dispatch({type:"HANDLE_CHANGE", payload:{field:"problem", value:data.problem}});
        dispatch({type:"HANDLE_CHANGE", payload:{field:"symptoms", value:data.symptoms}});
        dispatch({type:"HANDLE_CHANGE", payload:{field:"doctor", value:data.doctorName}});
        dispatch({type:"HANDLE_CHANGE", payload:{field:"department", value:data.department}});
    };

    const formDataList = [
        {name:"Name", type:"text",
            value:state.name,
            onChange:(value)=>dispatch({type:"HANDLE_CHANGE",payload:{field:"name",value}}),
            err:state.err.name
        },
        {name:"Age",
            type:"text",    
            value:state.age,
            onChange:(value)=>dispatch({type:"HANDLE_CHANGE",payload:{field:"age", value}}),
            err:state.err.age
        },
        {name:"Problem",
            type:"text",
            value:state.problem,
            onChange:(value)=>dispatch({type:"HANDLE_CHANGE", payload:{field:"problem", value}}),
            err:state.err.problem
        },
        {name:"Symptoms",
            type:"text",
            value:state.symptoms,
            onChange:(value)=>dispatch({type:"HANDLE_CHANGE", payload:{field:"symptoms", value}}),
            err:state.err.symptoms
        },
        {name:"Doctor",
            type:"text",
            value:state.doctor,
            onChange:(value)=>dispatch({type:"HANDLE_CHANGE", payload:{field:"doctor", value}})},
        {name:"Department",
            type:"text",    
            value:state.department,
            onChange:(value)=>dispatch({type:"HANDLE_CHANGE", payload:{field:"department", value}})}
    ]
        
    const handleSubmit = async()=>{
        const updatedData ={
            id:editInfo,
            name:state.name,
            age:state.age,
            problem:state.problem,
            symptoms:state.symptoms,
            doctor:state.doctor,
            department:state.department
        };

        try{
            const response = await axios.put("http://localhost:5000/api/updateAppointment", updatedData);
        }catch{
            
        }
    }
    
    

return(
    <div>
        <h3>Your Appointments</h3>
        {isLoading && (<h5 style={{color:"blue"}}>Loading Info..... </h5>)}
        
        { !isLoading && filteredAppointments.length===0
        
        ?(<p style={{color:"red"}}>No Scheduled Appointments</p>)
        
        :(
            filteredAppointments.map((data)=>(
                <div key={data.appointmentId}>
                    <p>Name: {data.patientName}</p>
                    <p>Age: {data.age}</p>
                    <p>Problem:{data.problem}</p>
                    <p>Symptoms:{data.symptoms}</p>
                    <p>Doctor: Dr.{data.doctorName}</p>
                    <p>Department:{data.department}</p>

                    <button onClick={()=>{handleEdit(data.appointmentId); handleDataEdit(data);}}>EDIT INFO</button>
                    {showForm && (
                        <ReForm data={formDataList} onSubmit={handleSubmit} />
                    )}
                </div>
                
            ))
        )}
    </div>
)
}