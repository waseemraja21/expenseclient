import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../context/AuthContext';

const UpdateBudget = () => {
    const [budget, setBudget] = useState('');
    const [newBudget, setNewBudget] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { currentUser } = useContext(UserContext);
    const token = currentUser?.token;
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }

        // Fetch current budget
        const fetchCurrentBudget = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/budget/get`, {
                    withCredentials: true,
                    headers: { Authorization: `Bearer ${token}` },
                });
                setBudget(response.data.amount);
            } catch (err) {
                setError('No budget set for this month');
            }
        };

        fetchCurrentBudget();
    }, [token, navigate]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (newBudget <= 0) {
            setError('Please enter a valid budget amount');
            return;
        }

        try {
            const response = await axios.put(
                `${BASE_URL}/budget/update`,
                { amount: newBudget },
                {
                    withCredentials: true,
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            setSuccessMessage(response.data.message);
            setError('');
            setBudget(newBudget); // Update displayed budget
            setNewBudget('');
            navigate("/")
        } catch (error) {
            setError('Error updating budget. Try again.');
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                {budget ? "Update Your Budget" : "Set Your Monthly Budget"}
            </h2>

            {error && <p className="text-red-600 text-sm text-center mb-2">{error}</p>}
            {successMessage && <p className="text-green-600 text-sm text-center mb-2">{successMessage}</p>}

            {budget ? (
                <div className="text-center mb-4">
                    <p className="text-gray-700">Current Budget: <span className="font-bold">${budget}</span></p>
                </div>
            ) : (
                <p className="text-center text-gray-600 mb-4">No budget set for this month.</p>
            )}

            <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-medium mb-1">New Budget Amount</label>
                    <input
                        type="number"
                        value={newBudget}
                        onChange={(e) => setNewBudget(e.target.value)}
                        placeholder="Enter new budget"
                        required
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                >
                    {budget ? "Update Budget" : "Set Budget"}
                </button>
            </form>
        </div>
    );
};

export default UpdateBudget;
