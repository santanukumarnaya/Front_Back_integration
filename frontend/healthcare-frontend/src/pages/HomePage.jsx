import homeImg from "../data/HomePage.png";
import divImg1 from "../data/1234.png";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import LoginPage from "../components/LoginPage";
import "./homePage.css"
export default function HomePage(){

    // const navigate = useNavigate();
return(
    <div style={{backgroundImage:`url(${homeImg})`}} className="full-page">
    <header>
     <h1>Wlcome to the App</h1>
    </header>
    <main className="main-view">
        <div className="flex-main1">
        {/*  wrap it inside Link*/}
        <Link to="/loginPage">
        <div className="div-card">
            <div style={{backgroundImage:`url(${divImg1})`}}></div>
            <div>
                <h5>
                   <b> Book your Appointment </b>
                </h5>
            </div>
        </div>
        </Link>
        {/*  */}
        <div className="div-card">
            <h3>hello</h3>
        </div>
        {/*  */}
        <div className="div-card">
            <h3>Hello</h3>
        </div>
        {/*  */}
        </div>
        {/*  */}

        <div>
            <h2>This is Something I am trying to create on my project basis</h2>
        </div>
    </main>
    <footer>
     <h1>Fotter</h1>
    </footer>
    </div>
)
}