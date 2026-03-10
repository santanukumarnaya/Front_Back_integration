import { Link } from "react-router-dom"
import divIm from "../data/1234.png";
import drImg1 from "../data/Tom.webp";
import drImg2 from "../data/Brad.jpg";
import drImg3 from "../data/Chris.jpg";
import "./patientspage.css"
// import BookAppointment from "./BookAppointment";
import RoundFaceCard from "../components/RoundFaceCard";

export default function PateintsPage(){
    const pName = localStorage.getItem("name");
    const imgData =[
        {img: drImg1, name:"Dr. Tom" },
        {img: drImg2, name:"Dr. Brad" },
        {img: drImg3, name:"Dr. Chris" }
    ] 
        
    
return(
    <div className="fullPage">
    <header>
        <h3>Hello  {pName}</h3>
    </header>
    <main className="page-main">
    <div className="div-cardLayout">
        <div className="patient-card">
            <Link to="/bookAppointment">
                <div style={{backgroundImage:`url(${divIm})`}} className="div-img"></div>
                <div><h4>Book Your Appointment</h4></div>
            </Link>
        </div>

        <div className="patient-card">
            <h3>Hello</h3>
        </div>

        <div className="patient-card">
            <h3>Hello</h3>
        </div>
    </div>

    <div className="facecard-container">
        <RoundFaceCard imgData={imgData}/>
        <button className="arrow-button">all →</button>
    </div>
    </main>
    </div>
)
}