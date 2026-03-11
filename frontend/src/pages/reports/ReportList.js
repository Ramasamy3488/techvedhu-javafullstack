import React, { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "../dashboard/Dashboard";

function ReportList() {

    const [reports, setReports] = useState([]);
    const [name, setName] = useState("");

    const API = "http://localhost:8080/reports";

    useEffect(() => {
        loadReports();
    }, []);

    // LOAD ALL REPORTS
    const loadReports = () => {

        axios.get(API)
            .then(res => setReports(res.data))
            .catch(err => console.error(err));

    };


    // SEARCH BY NAME
    const searchByName = () => {

        if(name === ""){
            loadReports();
            return;
        }

        axios.get(`${API}/student?name=${name}`)
            .then(res => setReports(res.data))
            .catch(err => console.error(err));

    };


    // SORT BY MARKS
    const sortByMarks = () => {

        axios.get(`${API}/sort/marks`)
            .then(res => setReports(res.data))
            .catch(err => console.error(err));

    };


    // CLEAR SEARCH
    const clearSearch = () => {

        setName("");
        loadReports();

    };


    // CLEAR SORT
    const clearSort = () => {

        loadReports();

    };



    return (

        <div className="container mt-4">

            <div style={{ width: "100%", transform: "scale(0.6)", transformOrigin: "top" }}>
                <Dashboard />
            </div>

            <h2>Student Reports</h2>

            {/* SEARCH */}

            <div className="mb-3">

                <input
                    type="text"
                    placeholder="Search by Student Name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    className="form-control mb-2"
                />

                <button
                    className="btn btn-primary me-2"
                    onClick={searchByName}
                >
                    Search
                </button>

                <button
                    className="btn btn-secondary me-2"
                    onClick={clearSearch}
                >
                    Clear Search
                </button>

                <button
                    className="btn btn-success me-2"
                    onClick={sortByMarks}
                >
                    Sort By Marks
                </button>

                <button
                    className="btn btn-dark"
                    onClick={clearSort}
                >
                    Clear Sort
                </button>

            </div>


            {/* TABLE */}

            <table className="table table-bordered">

                <thead className="table-dark">

                <tr>
                    <th>Student Name</th>
                    <th>Email</th>
                    <th>Course</th>
                    <th>Marks</th>
                    <th>Result</th>
                </tr>

                </thead>

                <tbody>

                {reports.map((r,index)=>(

                    <tr key={index}>

                        <td>{r.studentName}</td>
                        <td>{r.email}</td>
                        <td>{r.courseName}</td>
                        <td>{r.marks}</td>

                        <td>

                            {r.result === "PASS"
                                ? <span className="text-success fw-bold">PASS</span>
                                : <span className="text-danger fw-bold">FAIL</span>
                            }

                        </td>

                    </tr>

                ))}

                </tbody>

            </table>

        </div>

    );

}

export default ReportList;