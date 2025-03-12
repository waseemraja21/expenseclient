import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
    const [error, setError] = useState("");
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (formData.password !== formData.confirmPassword) {
            return setError("Passwords do not match.");
        }

        try {
            const response = await axios.post(`${BASE_URL}/auth/register`, formData);
            if (response.data) {
                navigate("/login");
            } else {
                setError("Couldn't register user!");
            }
        } catch (error) {
            setError(error.response?.data?.message || "Error registering. Try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Register</h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 mt-6 rounded-md hover:bg-green-700 transition"
                >
                    Register
                </button>

                <p className="text-center mt-4 text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
