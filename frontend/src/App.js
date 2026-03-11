import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Dashboard
import Dashboard from "./pages/dashboard/Dashboard";

// Students
import StudentsList from "./pages/students/StudentsList";


// Courses
import CoursesList from "./pages/courses/CoursesList";


// Enrollments
import EnrollmentList from "./pages/enrollments/EnrollmentList";

// Reports
import ReportList from "./pages/reports/ReportList";

// Protected Route Wrapper
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Default Route */}
                <Route path="/" element={<Navigate to="/login" />} />

                {/* Auth Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Dashboard */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Students Routes */}
                <Route
                    path="/students"
                    element={
                        <ProtectedRoute>
                            <StudentsList />
                        </ProtectedRoute>
                    }
                />


                {/* Courses Routes */}
                <Route
                    path="/courses"
                    element={
                        <ProtectedRoute>
                            <CoursesList />
                        </ProtectedRoute>
                    }
                />

               {/* Enrollments Routes */}
                <Route
                    path="/enrollments"
                    element={
                        <ProtectedRoute>
                            <EnrollmentList />
                        </ProtectedRoute>
                    }
                />

               {/* Reports */}
                <Route
                    path="/reports"
                    element={
                        <ProtectedRoute>
                            <ReportList />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;