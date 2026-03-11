import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/axiosConfig";

function Register() {

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    });

    const register = async (e) => {

        e.preventDefault();

        try {

            await API.post("/auth/register", user);

            alert("User Registered");

            window.location = "/";

        } catch (error) {

            alert("Registration Failed");

        }

    };

    return (

        <div className="container col-md-4 mt-5">

            <div className="card p-4">

                <h3 className="text-center mb-3">Register</h3>

                <form onSubmit={register}>

                    <input
                        className="form-control mb-2"
                        placeholder="Username"
                        onChange={(e) =>
                            setUser({ ...user, username: e.target.value })
                        }
                    />

                    <input
                        className="form-control mb-2"
                        placeholder="Email"
                        onChange={(e) =>
                            setUser({ ...user, email: e.target.value })
                        }
                    />

                    <input
                        type="password"
                        className="form-control mb-2"
                        placeholder="Password"
                        onChange={(e) =>
                            setUser({ ...user, password: e.target.value })
                        }
                    />

                    <button className="btn btn-success w-100 mb-2">
                        Register
                    </button>

                </form>

                {/* Login Button */}

                <div className="text-center">
                    Already have an account?
                    <Link to="/" className="btn btn-link">
                        Login
                    </Link>
                </div>

            </div>

        </div>

    );

}

export default Register;