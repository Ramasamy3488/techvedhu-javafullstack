import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate();

    return (

        <div className="container mt-5">

            <h2 className="text-center mb-4">Students Admin Dashboard</h2>

            <div className="row g-4">

                {/* Students */}
                <div className="col-lg-3 col-md-6">
                    <div className="card text-center shadow h-100">
                        <div className="card-body">
                            <h4 className="card-title">Students</h4>
                            <p className="card-text">Manage Students</p>
                            <button
                                className="btn btn-primary"
                                onClick={() => navigate("/students")}
                            >
                                Open
                            </button>
                        </div>
                    </div>
                </div>

                {/* Courses */}
                <div className="col-lg-3 col-md-6">
                    <div className="card text-center shadow h-100">
                        <div className="card-body">
                            <h4 className="card-title">Courses</h4>
                            <p className="card-text">Manage Courses</p>
                            <button
                                className="btn btn-success"
                                onClick={() => navigate("/courses")}
                            >
                                Open
                            </button>
                        </div>
                    </div>
                </div>

                {/* Enrollments */}
                <div className="col-lg-3 col-md-6">
                    <div className="card text-center shadow h-100">
                        <div className="card-body">
                            <h4 className="card-title">Enrollments</h4>
                            <p className="card-text">Assign Courses</p>
                            <button
                                className="btn btn-warning"
                                onClick={() => navigate("/enrollments")}
                            >
                                Open
                            </button>
                        </div>
                    </div>
                </div>

                {/* Reports */}
                <div className="col-lg-3 col-md-6">
                    <div className="card text-center shadow h-100">
                        <div className="card-body">
                            <h4 className="card-title">Reports</h4>
                            <p className="card-text">Student Reports</p>
                            <button
                                className="btn btn-danger"
                                onClick={() => navigate("/reports")}
                            >
                                Open
                            </button>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    );
}

export default Dashboard;