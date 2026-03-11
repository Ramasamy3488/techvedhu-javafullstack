import React, { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "../dashboard/Dashboard";

function EnrollmentList() {

    const [enrollments, setEnrollments] = useState([]);

    const [enrollment, setEnrollment] = useState({
        studentId: "",
        courseId: "",
        marks: ""
    });

    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);

    const [editingId, setEditingId] = useState(null);

    const API = "http://localhost:8080/enrollments";

    const token = localStorage.getItem("token");

    const authHeader = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    useEffect(() => {
        loadEnrollments();
        loadStudents();
        loadCourses();
    }, []);

    // LOAD ENROLLMENTS
    const loadEnrollments = () => {

        axios.get(API, authHeader)
            .then(res => setEnrollments(res.data))
            .catch(err => console.error(err));

    };

    // LOAD STUDENTS
    const loadStudents = () => {

        axios.get("http://localhost:8080/students", authHeader)
            .then(res => setStudents(res.data))
            .catch(err => console.error(err));

    };

    // LOAD COURSES
    const loadCourses = () => {

        axios.get("http://localhost:8080/courses", authHeader)
            .then(res => setCourses(res.data))
            .catch(err => console.error(err));

    };

    // FORM CHANGE
    const handleChange = (e) => {

        setEnrollment({
            ...enrollment,
            [e.target.name]: e.target.value
        });

    };

    // ADD ENROLLMENT
    const addEnrollment = () => {

        axios.post(API, enrollment, authHeader)
            .then(() => {

                loadEnrollments();

                setEnrollment({
                    studentId: "",
                    courseId: "",
                    marks: ""
                });

            })
            .catch(err => console.error("Add Error:", err));

    };

    // EDIT ENROLLMENT
    const editEnrollment = (e) => {

        setEnrollment({
            studentId: e.studentId || "",
            courseId: e.courseId || "",
            marks: e.marks || ""
        });

        setEditingId(e.id);

    };

    // UPDATE ENROLLMENT
    const updateEnrollment = () => {

        axios.put(`${API}/${editingId}`, enrollment, authHeader)
            .then(() => {

                loadEnrollments();

                setEnrollment({
                    studentId: "",
                    courseId: "",
                    marks: ""
                });

                setEditingId(null);

            })
            .catch(err => console.error("Update Error:", err));

    };

    // DELETE ENROLLMENT
    const deleteEnrollment = (id) => {

        if (!window.confirm("Delete this enrollment?"))
            return;

        axios.delete(`${API}/${id}`, authHeader)
            .then(() => loadEnrollments())
            .catch(err => console.error("Delete Error:", err));

    };

    return (

        <div className="container mt-4">

            <div style={{width:"100%", transform:"scale(0.6)", transformOrigin:"top"}}>
                <Dashboard />
            </div>

            <h2>Enrollment Management</h2>

            {/* FORM */}

            <div className="card p-3 mb-4">

                <select
                    className="form-control mb-2"
                    name="studentId"
                    value={enrollment.studentId}
                    onChange={handleChange}
                >
                    <option value="">Select Student</option>

                    {students.map(s => (
                        <option key={s.id} value={s.id}>
                            {s.name}
                        </option>
                    ))}

                </select>

                <select
                    className="form-control mb-2"
                    name="courseId"
                    value={enrollment.courseId}
                    onChange={handleChange}
                >
                    <option value="">Select Course</option>

                    {courses.map(c => (
                        <option key={c.id} value={c.id}>
                            {c.courseName}
                        </option>
                    ))}

                </select>

                <input
                    className="form-control mb-2"
                    name="marks"
                    placeholder="Marks"
                    value={enrollment.marks}
                    onChange={handleChange}
                />

                {editingId ? (

                    <button
                        className="btn btn-warning"
                        onClick={updateEnrollment}
                    >
                        Update Enrollment
                    </button>

                ) : (

                    <button
                        className="btn btn-primary"
                        onClick={addEnrollment}
                    >
                        Add Enrollment
                    </button>

                )}

            </div>

            {/* TABLE */}

            <table className="table table-bordered">

                <thead className="table-dark">

                <tr>
                    <th>ID</th>
                    <th>Student Name</th>
                    <th>Course Name</th>
                    <th>Marks</th>
                    <th>Actions</th>
                </tr>

                </thead>

                <tbody>

                {enrollments.map((e) => (

                    <tr key={e.id}>

                        <td>{e.id}</td>
                        <td>{e.studentName}</td>
                        <td>{e.courseName}</td>
                        <td>{e.marks}</td>

                        <td>

                            <button
                                className="btn btn-sm btn-warning me-2"
                                onClick={() => editEnrollment(e)}
                            >
                                Edit
                            </button>

                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() => deleteEnrollment(e.id)}
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

export default EnrollmentList;