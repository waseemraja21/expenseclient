import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../context/AuthContext';

const SetBudget = () => {
    const [budget, setBudget] = useState(null);
    const [inputBudget, setInputBudget] = useState(''); // Separate state for input
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { currentUser } = useContext(UserContext);
    const token = currentUser?.token;
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/");
            return;
        }

        const fetchCurrentBudget = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/budget/get`, {
                    withCredentials: true,
                    headers: { Authorization: `Bearer ${token}` },
                });
                setBudget(response.data.amount);
            } catch (err) {
                console.log('No budget set for this month', err);
                setBudget(null);
            }
        };

        fetchCurrentBudget();
    }, [token, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!inputBudget || Number(inputBudget) <= 0) {
            setError('Please enter a valid budget amount');
            return;
        }

        try {
            const response = await axios.post(
                `${BASE_URL}/budget/set`,
                {
                    month: new Date().toLocaleString('default', { month: 'long' }),
                    year: new Date().getFullYear(),
                    amount: Number(inputBudget),
                },
                { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
            );

            setSuccessMessage(response.data.message);
            setError('');
            setBudget(Number(inputBudget)); // Update displayed budget
            setInputBudget(''); // Clear input after successful submission
        } catch (error) {
            console.log('Error setting budget', error);
            setError('Error setting budget. Try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 overflow-auto">
            <div className="w-full max-w-lg bg-white p-4 sm:p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                    {budget !== null ? "Your Monthly Budget" : "Set Your Monthly Budget"}
                </h2>

                {error && <p className="text-red-600 text-center mb-2">{error}</p>}
                {successMessage && <p className="text-green-600 text-center mb-2">{successMessage}</p>}

                {budget !== null ? (
                    <div className="text-center space-y-2">
                        <p className="text-lg font-medium">💰 Your budget for this month:</p>
                        <p className="text-3xl font-bold text-green-700">${budget}</p>
                        <button
                            className="mt-2 px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
                            onClick={() => navigate("/update-budget")}
                        >
                            Update Budget
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Budget Amount</label>
                            <input
                                type="number"
                                value={inputBudget}
                                onChange={(e) => setInputBudget(e.target.value)}
                                placeholder="Enter your budget"
                                required
                                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                        >
                            Set Budget
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default SetBudget;