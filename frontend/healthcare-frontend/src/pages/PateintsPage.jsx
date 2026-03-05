import { Link } from "react-router-dom"
import divIm from "../data/1234.png";
import "./patientspage.css"
import BookAppointment from "./BookAppointment";
export default function PateintsPage(){
    
return(
    <div className="fullPage">
    <div className="div-dav">
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
    </div>
)
}