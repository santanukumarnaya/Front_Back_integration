import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import DoctorPage from "./pages/DoctorPage";
import PateintsPage from "./pages/PateintsPage";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import BookAppointment from "./pages/BookAppointment";
import "./app.css"

export default function App(){
  return(
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/loginPage" element={<LoginPage/>}/>
        <Route path="/doctorPage" element={<DoctorPage/>} />
        <Route path="/pateintsPage" element={<PateintsPage/>} />
        <Route path="/bookAppointment" element={<BookAppointment/>}/>
      </Routes>
    </BrowserRouter>
  )
}