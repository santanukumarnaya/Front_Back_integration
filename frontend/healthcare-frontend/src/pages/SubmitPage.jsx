import { useState, useEffect } from "react";
import axios from "axios";

export default function SubmitPage({data, setData}){

 const [submit, setSubmit] = useState([]);
 const handleChange = (section, field, value) => {
  setData(prev => ({
    ...prev,
    [section]: {
      ...prev[section],      [field]: value
    }
  }));
};

//  useEffect(()=>{
//     handleSubmit();
//  },[]);

    // we don't actually need the useState here but for my reason for conole i am using it nothing else;
    const handleSubmit = async (e) =>{
        e.preventDefault();

        const formData ={
            name:data.personalInfo.name,
            age:data.personalInfo.age,
            email:data.personalInfo.email,
            phone: data.personalInfo.phone,
            problem:data.reasons.problem,
            symptoms: data.reasons.symptoms
        }

        setSubmit((prev)=>[
            ...prev, formData
        ])
        try{
            const token = localStorage.getItem("token");

            const response = await axios.post(
                "http://localhost:5000/api/appointments/create",
                formData,
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            alert("Appoientment Booked Successfully");
        }catch(error){
            console.error(error);
            alert("Error");

        }

    };


return(
    <div>
        <h2>Review Details</h2>
        <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input name="name" type="text" value={data.personalInfo.name} onChange={(e)=> handleChange("personalInfo", "name",e.target.value)}/>
            <label>Age</label>
            <input name="age" type="text" value={data.personalInfo.age} onChange={(e)=> handleChange("personalInfo", "age",e.target.value)}/>
            <label>Email</label>
            <input name="email" type="text" value={data.personalInfo.email} onChange={(e)=> handleChange("personalInfo", "email",e.target.value)} />
            <label>Phone</label>
            <input name="phone" type="text" value={data.personalInfo.phone} onChange={(e)=> handleChange("personalInfo", "phone",e.target.value)}/>
            <label>Problem</label>
            <input name="problem" type="text" value={data.reasons.problem} onChange={(e)=> handleChange("reasons", "problem",e.target.value)}/>
            <label>Symptoms</label>
            <input name="symptoms" type="text" value={data.reasons.symptoms} onChange={(e)=> handleChange("reasons", "symptoms",e.target.value)}/>
            <button  type ="submit" >SUBMIT</button>
        </form>
    </div>
)
}