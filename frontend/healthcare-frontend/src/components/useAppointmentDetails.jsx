import { useState, useEffect } from "react";
import axios from "axios";

export default function useAppointmentDetails(){
    
    const [fetchedData, setFetchedData] = useState([]); 
    const [isLoading, setIsLoading] = useState(false);

    const handleFetching = async() =>{
        try{
            setIsLoading(true);

            const response = await axios.get("http://localhost:5000/api/getAppoinmentData/get");

            setFetchedData(response.data.appointmentDetails);
            console.log(response.data);
        }catch(error){
           console.error(error.message);
        }finally{
            setIsLoading(false)
        }
    };

    useEffect(()=>{
        handleFetching()
    },[]);
return {fetchedData, isLoading}
}