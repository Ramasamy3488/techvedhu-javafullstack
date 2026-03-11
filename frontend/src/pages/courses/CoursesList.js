import React, { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "../dashboard/Dashboard";

function CoursesList() {

    const [courses, setCourses] = useState([]);
    const [course, setCourse] = useState({
        courseName: "",
        fees: ""
    });

    const [editingId, setEditingId] = useState(null);

    const API = "http://localhost:8080/courses";

    useEffect(() => {
        loadCourses();
    }, []);

    const loadCourses = () => {
        axios.get(API)
            .then(res => setCourses(res.data))
            .catch(err => console.error(err));
    };

    const handleChange = (e) => {
        setCourse({ ...course, [e.target.name]: e.target.value });
    };

    const addCourse = () => {
        axios.post(API, course)
            .then(() => {
                loadCourses();
                setCourse({ courseName: "", fees: "" });
            });
    };

    const editCourse = (c) => {
        setCourse(c);
        setEditingId(c.id);
    };

    const updateCourse = () => {
        axios.put(`${API}/${editingId}`, course)
            .then(() => {
                loadCourses();
                setCourse({ courseName: "", fees: "" });
                setEditingId(null);
            });
    };

    const deleteCourse = (id) => {

        if (!window.confirm("Delete this course?")) return;

        axios.delete(`${API}/${id}`)
            .then(() => {
                alert("Course deleted successfully");
                loadCourses();
            })
            .catch((error) => {

                if (error.response) {

                    if (error.response.status === 403) {
                        alert("Cannot delete course because it is used in enrollments.");
                    }
                    else if (error.response.status === 500) {
                        alert("Course cannot be deleted because students are enrolled in this course.");
                    }
                    else {
                        alert("Error: " + error.response.data.message);
                    }

                } else {
                    alert("Server not reachable. Please try again.");
                }

            });
    };

    return (
        <div className="container mt-4">

            <div style={{ width: "100%", transform: "scale(0.6)", transformOrigin: "top" }}>
                <Dashboard />
            </div>

            <h2>Courses Management</h2>

            {/* Add / Update Form */}
            <div className="card p-3 mb-4">

                <input
                    className="form-control mb-2"
                    placeholder="Course Name"
                    name="courseName"
                    value={course.courseName}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-2"
                    placeholder="Fees"
                    name="fees"
                    value={course.fees}
                    onChange={handleChange}
                />

                {editingId ? (
                    <button
                        className="btn btn-warning"
                        onClick={updateCourse}
                    >
                        Update Course
                    </button>
                ) : (
                    <button
                        className="btn btn-primary"
                        onClick={addCourse}
                    >
                        Add Course
                    </button>
                )}

            </div>

            {/* Courses Table */}
            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Course Name</th>
                    <th>Fees</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {courses.map((c) => (
                    <tr key={c.id}>
                        <td>{c.id}</td>
                        <td>{c.courseName}</td>
                        <td>{c.fees}</td>
                        <td>
                            <button
                                className="btn btn-sm btn-warning me-2"
                                onClick={() => editCourse(c)}
                            >
                                Edit
                            </button>
                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() => deleteCourse(c.id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

        </div>
    );
}

export default CoursesList;