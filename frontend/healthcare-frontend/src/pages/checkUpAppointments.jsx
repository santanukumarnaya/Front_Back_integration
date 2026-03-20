import { useState, useEffect } from "react";
import useAppointmentDetails from "../components/useAppointmentDetails";
import axios from "axios";
export default function checkUpAppointment(){
    const {fetchedData , isLoading} = useAppointmentDetails();
    
    // const [deleteId, setDeleteId] = useState(null);
    const [patientList, setPatientList] = useState([]);

    const docId = localStorage.getItem("id");

    // const assignId = (id) =>{
    //     setDeleteId(id);
    // };
    
    useEffect(()=>{
        const filteredAppointments = fetchedData.filter((list)=> list.doctorId === docId) ;

        setPatientList(filteredAppointments);  
    },[fetchedData, docId]);  

    const handleDelete = async(deleteId) =>{
        // e.preventDefault();
        try{

            await axios.delete(`http://localhost:5000/api/deletedOrComplte/comleteReq/${deleteId}`);

            setPatientList((prev)=> prev.filter((item)=> item.appointmentId !== deleteId));
        
        }catch(err){
            console.log(err);
        }
    };

return(
    <div>
        {isLoading && ( <p>Loading appointment List ....</p> )}
        {!isLoading && patientList && (
            <div>
                {patientList.map((data)=>(
                    <div key={data.appointmentId}>
                        <p>Name: {data.patientName}</p>
                        <p>Age: {data.age}</p>
                        <p>Problem: {data.problem}</p>
                        <p>Symptoms: {data.symptoms}</p>
                        <button onClick={()=>handleDelete(data.appointmentId)}>Mark Completed</button>
                    </div>
                ))}
            </div>
        )}
    </div>
)
}
