import { useContext, useState } from "react";
import { UserContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setCurrentUser } = useContext(UserContext);
    const BASE_URL = import.meta.env.VITE_BASE_URL;;


    const loginUser = async (ev) => {
        ev.preventDefault();
        try {
            console.log(email, password);
            const response = await axios.post(
                `${BASE_URL}/auth/login`,
                { email, password }
            );
            const user = await response.data;
            console.log(response.data);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                console.log('Token stored:', response.data.token); // Debug log
            } else {
                console.error('No token received from backend');
            }

            setCurrentUser(user);
            navigate("/");
        } catch (err) {
            // Handle errors more gracefully
            console.error("Registration error:", err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <form onSubmit={loginUser} className="bg-white p-6 rounded-lg shadow-md max-w-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <label className="block mb-1 text-gray-700">Email</label>
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 "
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label className="block mb-1 text-gray-700">Password</label>
                <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                    Login
                </button>

                <p className="text-center mt-4 text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-blue-500 hover:underline">
                        Register
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
