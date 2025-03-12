import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const BudgetPage = () => {
    const [expenses, setExpenses] = useState([]);
    const { currentUser } = useContext(UserContext);
    const token = currentUser?.token;
    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_BASE_URL;;



    useEffect(() => {
        const fetchExpenses = async () => {
            if (!token) {
                navigate("/login");
            };

            try {
                const { data } = await axios.get(`${BASE_URL}/expenses/all`, {
                    withCredentials: true, headers: { Authorization: `Bearer ${token}` }
                });
                setExpenses(data);
            } catch (error) {
                console.error("Error fetching expenses", error);
            }
        };

        fetchExpenses();
    }, [token, navigate]);

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">My Expenses</h2>
            <ul>
                {expenses.map((expense) => (
                    <li key={expense._id} className="flex justify-between p-2 border-b last:border-none">
                        <span className="text-gray-700">{expense.category}</span>
                        <span className="font-medium text-red-600">- ${expense.amount}</span>
                        <span className="text-sm text-gray-500">{new Date(expense.date).toLocaleDateString()}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BudgetPage;
