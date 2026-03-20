<!-- {page===1 && (
    <Form >
)}
{page===2 && (
    <Form>
)}
{page === 3 && (
    <SubmitForm> //imported in this page?
)} -->

Navbar layout change 
as per login and all

import { useState, useEffect } from "react";

export default function Navbar() {

  const token = localStorage.getItem("token");

  return (
    <nav>
      <a href="/">Home</a>

      {token ? (
        <>
          <a href="/profile">Profile</a>
          <button>Logout</button>
        </>
      ) : (
        <>
          <a href="/login">Login</a>
          <a href="/signup">Signup</a>
        </>
      )}

    </nav>
  );
}


conditional rendering different home page?
const role = localStorage.getItem("role");

return (
  <div>
    <Navbar />

    {role === "doctor" && <DoctorDashboard />}
    {role === "patient" && <PatientDashboard />}
    {!role && <PublicHome />}

  </div>
);


