import axios from "axios";
import { useEffect, useState } from "react";

const RecentTransactions = () => {
    const [expenses, setExpenses] = useState([]);
    const BASE_URL = import.meta.env.VITE_BASE_URL;;
    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const token = localStorage.getItem("token"); // Fetch stored token

                const response = await axios.get(`${BASE_URL}/expenses/all`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Attach token
                    },
                });
                if (response.data && Array.isArray(response.data)) {
                    setExpenses(response.data);


                } else {
                    console.error("Invalid data format received");
                }
            } catch (error) {
                console.error("Error Fetching Expenses", error);
            }
        }
        fetchExpenses();
    }, [])

    const transactions = expenses.slice(-3).reverse();


    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Recent Transactions</h2>
            <ul>
                {transactions.map((transaction) => (
                    <li key={transaction.id} className={`flex justify-between p-2 ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                        <span>{transaction.category}</span>
                        <span>{transaction.amount > 0 ? `- $${transaction.amount}` : `- $${Math.abs(transaction.amount)}`}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecentTransactions;
