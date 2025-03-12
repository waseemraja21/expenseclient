import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts"; import { UserContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
;

const ExpenseChart = () => {
    const [chartData, setChartData] = useState([]);
    const currMonth = new Date().toLocaleString('en-US', { month: 'long' });
    const { currentUser } = useContext(UserContext);
    const token = currentUser?.token;
    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_BASE_URL;;


    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [token, navigate]);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                if (!token) {
                    navigate("/login");
                }
                if (token) {
                    console.log("token ", token);

                }

                const response = await axios.get(`${BASE_URL}/expenses/all`, {
                    withCredentials: true, headers: { Authorization: `Bearer ${token}` }
                });
                if (!response.data || response.data.length === 0) {
                    console.warn("No expenses found");
                    return;
                }

                // Group expenses by date for the current month
                const expensesByDate = {};
                response.data.forEach(expense => {
                    if (!expense.date) return; // Ensure date exists
                    const date = new Date(expense.date).toISOString().split("T")[0]; // Format: YYYY-MM-DD
                    expensesByDate[date] = (expensesByDate[date] || 0) + expense.amount;
                });

                // Prepare data for the chart (show all days of the month)
                const today = new Date();
                const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
                const formattedData = Array.from({ length: daysInMonth }, (_, i) => {
                    const date = new Date(today.getFullYear(), today.getMonth(), i + 1);
                    const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD
                    return {
                        date: date.toLocaleDateString("en-US", { day: "2-digit" }), // "Feb 10"
                        amount: expensesByDate[formattedDate] || 0
                    };
                });

                setChartData(formattedData);
            } catch (error) {
                console.error("Error fetching expenses", error);
            }
        };

        fetchExpenses();
    }, [token]);

    return (
        <div className="p-6 max-w-4xl mx-auto bg-green-300 rounded-xl shadow-black">
            <h2 className="text-xl font-bold mb-4">Daily Expenses {currMonth}</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar type="monotone" dataKey="amount" stroke="#8884d8" barSize={40} strokeWidth="2" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ExpenseChart;
