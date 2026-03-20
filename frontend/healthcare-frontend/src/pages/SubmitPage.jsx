import { useState, useEffect } from "react";
import axios from "axios";
export default function SubmitPage({data, setData}){

    const pId = localStorage.getItem("id");

    const [submit, setSubmit] = useState([]);
    const [department, setDepartment] = useState("");
    const [listOfDoc, setListOfDoc] = useState([]);
    const [searchDoc, setSearchDoc] = useState("");
    const [selectDoc, setSelectDoc] = useState(null); 
    const [listFiltered, setListFiltered] = useState([]);
    
    const handleChange = (section, field, value) => {
    setData(prev => ({
        ...prev,
        [section]: {
        ...prev[section],  [field]: value
        }
    }));
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();

        const formData ={
            patientId:pId,
            name:data.personalInfo.name,
            age:data.personalInfo.age,
            email:data.personalInfo.email,
            phone: data.personalInfo.phone,
            problem:data.reasons.problem,
            symptoms: data.reasons.symptoms,
            doctorId: selectDoc?.id,
            doctor: selectDoc?.name,
            department:selectDoc?.department,            
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

                console.log( "response",response);
            }catch(error){
                console.error(error);
                alert("Error");
            }
        };

    const handleSearch = async(dept) =>{
            try{
                const response = await axios.post("http://localhost:5000/api/searchDoctor/search", 
                    {department: dept});

                // const infoList = await response.json(); only used in "fetch"

                setListOfDoc(response.data.allDoctor);
            }catch(err){
                console.log(err.message);
            }
    };

    const filteredDoctors = listOfDoc.filter((doc)=>
    doc.name.toLowerCase().includes(searchDoc.toLowerCase())
    );
    
    
    useEffect(()=>{
        if(!selectDoc){
            setListFiltered(filteredDoctors);
        }
    },[searchDoc, listOfDoc]);



    return(
        <div>
            <h2>Review Details</h2>
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input name="name" type="text" value={data.personalInfo.name} 
                onChange={(e)=> handleChange("personalInfo", "name",e.target.value)}/>
                
                <label>Age</label>
                <input name="age" type="text" value={data.personalInfo.age} 
                onChange={(e)=> handleChange("personalInfo", "age",e.target.value)}/>
                
                <label>Email</label>
                <input name="email" type="text" value={data.personalInfo.email} 
                onChange={(e)=> handleChange("personalInfo", "email",e.target.value)} />
                
                <label>Phone</label>
                <input name="phone" type="text" value={data.personalInfo.phone} 
                onChange={(e)=> handleChange("personalInfo", "phone",e.target.value)}/>
                
                <label>Problem</label>
                <input name="problem" type="text" value={data.reasons.problem} 
                onChange={(e)=> handleChange("reasons", "problem",e.target.value)}/>
                
                <label>Symptoms</label>
                <input name="symptoms" type="text" value={data.reasons.symptoms} 
                onChange={(e)=> handleChange("reasons", "symptoms",e.target.value)}/>
                <button  type ="submit" >SUBMIT</button>
                
                <label>Which Department</label>
                <select value={department} 
                onChange={(e)=>{const value =e.target.value; setDepartment(value); handleSearch(value)}}>
                    <option value="">Selecct department</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Gastroenterology">Gastroenterology</option>
                    <option value="Dermatology">Dermatology</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Gynecology">Gynecology</option>
                    <option value="Oncology">Oncology</option>
                    <option value="Urology">Urology</option>
                    <option value="Endocrinology">Endocrinology</option>
                    <option value="Nephrology">Nephrology</option>
                    <option value="Pulmonology">Pulmonology</option>
                    <option value="Psychiatry">Psychiatry</option>
                    <option value="Ophthalmology">Ophthalmology</option>
                    <option value="ENT (Ear Nose Throat)">ENT (Ear Nose Throat)</option>
                    <option value="General Medicine">General Medicine</option>
                    <option value="Radiology">Radiology</option>
                    <option value="Anesthesiology">Anesthesiology</option>
                    <option value="Rheumatology">Rheumatology</option>
                    <option value="Hematology">Hematology</option>
                </select>

                <label >Doctor's Name</label>
                <input type="text" placeholder="Search Doctor" 
                    value={searchDoc}
                    onChange={(e)=>setSearchDoc(e.target.value)}
                />
                {searchDoc && listFiltered.length> 0 && (
                    <div>
                        {listFiltered.map((doc)=>(
                            <div key={doc.doctorId}
                                onClick={()=> {setSelectDoc(doc); setSearchDoc(doc.name); setListFiltered([])}}
                            >
                                {doc.name}
                            </div>
                        ))}
                    </div>
                )}


            </form>
        </div>
    )
}