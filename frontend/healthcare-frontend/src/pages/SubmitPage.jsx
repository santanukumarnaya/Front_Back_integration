import { useState, useEffect } from "react";
import axios from "axios";

export default function SubmitPage({data, setData}){

    const [submit, setSubmit] = useState([]);
 const handleChange = (section, field, value) => {
  setData(prev => ({
    ...prev,
    [section]: {
      ...prev[section],
      [field]: value
    }
  }));
};

    // we don't actually need the useState here but for my reason for conole i am using it nothing else;
    const handleSubmit = async (e) =>{
        e.preventDefault();

        const formData ={
            id: Date.now(),
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
        <form >
            <label>Name</label>
            <input name="name" type="text" value={data.personalInfo.name} onChange={(value)=> handleChange("personalInfo", "name",value)}/>
            <label>Age</label>
            <input name="age" type="text" value={data.personalInfo.age} onChange={(value)=> handleChange("personalInfo", "age",value)}/>
            <label>Email</label>
            <input name="email" type="text" value={data.personalInfo.email} onChange={(value)=> handleChange("personalInfo", "email",value)} />
            <label>Phone</label>
            <input name="phone" type="text" value={data.personalInfo.phone} onChange={(value)=> handleChange("personalInfo", "phone",value)}/>
            <label>Problem</label>
            <input name="problem" type="text" value={data.reasons.problem} onChange={(value)=> handleChange("reasons", "problem",value)}/>
            <label>Symptoms</label>
            <input name="symptoms" type="text" value={data.reasons.symptoms} onChange={(value)=> handleChange("reasons", "symptoms",value)}/>
            <button onSubmit={handleSubmit}>SUBMIT</button>
        </form>
    </div>
)
}