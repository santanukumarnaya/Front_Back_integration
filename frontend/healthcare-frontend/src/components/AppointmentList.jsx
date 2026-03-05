import { useState, useEffect } from "react";

export default function AppointmentList(){
    const [pateintData, setPateintData] = useState([]);


    const handleData = async () => {
        try {
          const response = await fetch("");
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error(error);
        } finally {
          // cleanup
        }
      };
    useEffect(() => {    
      handleData();
    }, []);
return
}