import React, { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "../dashboard/Dashboard";

function StudentsList() {

    const [students, setStudents] = useState([]);
    const [student, setStudent] = useState({
        name: "",
        email: "",
        city: ""
    });

    const [editingId, setEditingId] = useState(null);

    const API = "http://localhost:8080/students";

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = () => {
        axios.get(API)
            .then(res => setStudents(res.data))
            .catch(err => console.error(err));
    };

    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const addStudent = () => {

        axios.post(API, student)
            .then(() => {
                loadStudents();
                setStudent({ name: "", email: "", city: "" });
            });
    };

    const editStudent = (s) => {
        setStudent(s);
        setEditingId(s.id);
    };

    const updateStudent = () => {

        axios.put(`${API}/${editingId}`, student)
            .then(() => {
                loadStudents();
                setStudent({ name: "", email: "", city: "" });
                setEditingId(null);
            });
    };

    const deleteStudent = (id) => {

        if (!window.confirm("Are you sure to delete this student?"))
            return;

        axios.delete(`${API}/${id}`)
            .then(() => {
                alert("Student deleted successfully");
                loadStudents();
            })
            .catch((error) => {

                if (error.response && error.response.status === 403) {
                    alert("Cannot delete student because it is used in enrollment");
                } else {
                    alert("Delete failed");
                }

            });
    };

    return (

        <div className="container mt-4">

            <div style={{width:"100%", transform:"scale(0.6)", transformOrigin:"top"}}>
                <Dashboard />
            </div>


            <h2>Students Management</h2>

            {/* Add / Update Form */}

            <div className="card p-3 mb-4">

                <input
                    className="form-control mb-2"
                    placeholder="Name"
                    name="name"
                    value={student.name}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-2"
                    placeholder="Email"
                    name="email"
                    value={student.email}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-2"
                    placeholder="City"
                    name="city"
                    value={student.city}
                    onChange={handleChange}
                />

                {editingId ? (

                    <button
                        className="btn btn-warning"
                        onClick={updateStudent}
                    >
                        Update Student
                    </button>

                ) : (

                    <button
                        className="btn btn-primary"
                        onClick={addStudent}
                    >
                        Add Student
                    </button>

                )}

            </div>

            {/* Students Table */}

            <table className="table table-bordered">

                <thead className="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>City</th>
                    <th>Actions</th>
                </tr>
                </thead>

                <tbody>

                {students.map((s) => (

                    <tr key={s.id}>
                        <td>{s.id}</td>
                        <td>{s.name}</td>
                        <td>{s.email}</td>
                        <td>{s.city}</td>

                        <td>

                            <button
                                className="btn btn-sm btn-warning me-2"
                                onClick={() => editStudent(s)}
                            >
                                Edit
                            </button>

                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() => deleteStudent(s.id)}
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

export default StudentsList;