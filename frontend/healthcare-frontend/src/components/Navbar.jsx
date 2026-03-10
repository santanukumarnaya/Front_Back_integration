import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import  bgImage from "../data/pxfuel.jpg"
export default function Navbar(){
    const [dark, setDark] = useState(false);
    const [modal, setModal] = useState(false);
    const navigate = useNavigate();

    const modalRef = useRef(null);

    useEffect(()=>{
        const handleClickedOutside=(event)=>{
            if(modalRef.current && !modalRef.current.contains(event.target)){
                setModal(false);
            }
        }
        document.addEventListener("mousedown", handleClickedOutside);

        return ()=>{
            document.removeEventListener("mousedown", handleClickedOutside);
        };
    },[]);

return(
    <div className="navbar-layout" style={{backgroundImage:`url(${bgImage})`}}>
        <button onClick={()=>setDark(!dark)} className="nav-button1">{dark?"Dark Mode":"Light Mode"}</button>

        <button className="nav-button2" >LOGIN</button>
        <button onClick={()=>setModal(prev => !prev)}>
            Sign Up
        </button>
        {modal && (
            <div className="\modal_popup" ref={modalRef}>
                {/* <h4><p>SignUp as Doctor</p>/ <br /> <p>SignUp as Patient</p></h4>  */}
                <span>SignUp as Doctor</span>/
                <span>SignUp as Patient</span>
            </div>
        )}
    </div>
)
}