import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import  bgImage from "../data/pxfuel.jpg"
export default function Navbar(){
    const [dark, setDark] = useState(false);
    // const [modal, setModal] = useState(false);
    const navigate = useNavigate();

return(
    <div className="navbar-layout" style={{backgroundImage:`url(${bgImage})`}}>
        <button onClick={()=>setDark(!dark)} className="nav-button1">{dark?"Dark Mode":"Light Mode"}</button>

        <button className="nav-button2" >LOGIN</button>
    </div>
)
}