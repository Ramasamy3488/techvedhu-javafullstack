import React from "react";
import { Link } from "react-router-dom";

function Sidebar(){

    return(

        <div className="sidebar">

            <Link to="/dashboard">Dashboard</Link>

            <Link to="/students">Students</Link>

            <Link to="/courses">Courses</Link>

            <Link to="/enrollments">Enrollments</Link>

            <Link to="/reports">Reports</Link>

        </div>

    )

}

export default Sidebar;