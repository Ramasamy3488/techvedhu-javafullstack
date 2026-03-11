import React from "react";

function Navbar(){

    const logout = () =>{
        localStorage.removeItem("token");
        window.location.href="/login";
    }

    return(

        <div className="navbar">

            <h3>Student Management</h3>

            <button onClick={logout}>Logout</button>

        </div>

    )

}

export default Navbar;