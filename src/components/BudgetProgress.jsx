import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const BudgetProgress = () => {
    const [budget, setBudget] = useState(0);
    const [expenses, setExpenses] = useState(0);
    const [percentageUsed, setPercentageUsed] = useState(0);
    const { currentUser } = useContext(UserContext);
    const token = currentUser?.token;
    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        const fetchBudgetData = async () => {
            try {
                const budgetRes = await axios.get(`${BASE_URL}/budget/get`, {
                    withCredentials: true,
                    headers: { Authorization: `Bearer ${token}` }
                });

                const expenseRes = await axios.get(`${BASE_URL}/expenses/currmonth`, {
                    withCredentials: true,
                    headers: { Authorization: `Bearer ${token}` }
                });

                const totalExpenses = expenseRes.data.reduce((sum, expense) => sum + expense.amount, 0);

                setBudget(budgetRes.data.amount);
                setExpenses(totalExpenses);
                setPercentageUsed(((totalExpenses / budgetRes.data.amount) * 100).toFixed(2));

            } catch (error) {
                console.error("Error fetching budget data:", error.response?.data || error.message);
            }
        };

        fetchBudgetData();
    }, [token]);

    return (
        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-2xl mx-auto mt-4">
            <h2 className="text-lg font-semibold mb-2 text-center">Budget Usage</h2>

            <div className="relative w-full bg-gray-200 h-6 rounded-full overflow-hidden">
                <div
                    className={`h-full ${percentageUsed >= 90 ? "bg-red-500" : "bg-blue-500"}`}
                    style={{ width: `${percentageUsed}%` }}
                ></div>
            </div>

            <p className="mt-2 text-gray-600 text-sm text-center">
                {expenses} / {budget} used ({percentageUsed}%)
            </p>

            {percentageUsed >= 90 && percentageUsed <= 100 && (
                <p className="text-red-500 font-bold mt-2 text-center">⚠️ Warning: You are close to exceeding your budget!</p>
            )}
            {percentageUsed >= 100 && (
                <p className="text-red-500 font-bold mt-2 text-center">⚠️ Warning: You have exhausted your monthly budget!</p>
            )}
        </div>
    );
};

export default BudgetProgress;
