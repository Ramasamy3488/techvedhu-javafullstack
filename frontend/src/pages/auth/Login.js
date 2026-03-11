import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import API from "../../api/axiosConfig";

function Login(){

    const navigate = useNavigate();

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const login = async(e)=>{

        e.preventDefault();

        try{

            const res = await API.post("/auth/login",{
                username,
                password
            });

            localStorage.setItem("token",res.data.token);

            navigate("/dashboard");

        }catch(err){

            alert("Invalid Login");

        }

    }

    return(

        <div className="container col-md-4 mt-5">

            <div className="card p-4">

                <h3 className="text-center">Login</h3>

                <form onSubmit={login}>

                    <input
                        className="form-control mb-3"
                        placeholder="Username"
                        onChange={(e)=>setUsername(e.target.value)}
                    />

                    <input
                        type="password"
                        className="form-control mb-3"
                        placeholder="Password"
                        onChange={(e)=>setPassword(e.target.value)}
                    />

                    <button className="btn btn-primary w-100">
                        Login
                    </button>

                </form>

                <div className="text-center mt-3">

                    <span>Don't have an account? </span>

                    <Link to="/register" className="btn btn-success btn-sm ms-2">
                        Register
                    </Link>

                </div>

            </div>

        </div>

    )

}

export default Login;