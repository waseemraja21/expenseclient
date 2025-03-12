import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AddExpenseForm = ({ onSave }) => {
    const [category, setCategory] = useState("");
    const [customCategory, setCustomCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [notes, setNotes] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { currentUser } = useContext(UserContext);
    const token = currentUser?.token;
    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_BASE_URL;;


    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [token, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const finalCategory = category === "Other" ? customCategory : category;

        if (!finalCategory || !amount || !date) {
            setErrorMessage("Please fill in all required fields!");
            return;
        }

        if (amount <= 0) {
            setErrorMessage("Amount must be greater than 0.");
            return;
        }

        setErrorMessage("");
        setSuccessMessage("");

        const newExpense = { category: finalCategory, amount: parseFloat(amount), date, notes };


        try {
            setLoading(true);

            const response = await axios.post(`${BASE_URL}/expenses/add`, newExpense, {
                withCredentials: true, headers: { Authorization: `Bearer ${token}` }
            });

            setSuccessMessage("Expense added successfully!");
            setTimeout(() => setSuccessMessage(""), 3000);

            // Reset form
            setCategory("");
            setCustomCategory("");
            setAmount("");
            setDate("");
            setNotes("");

            // Call onSave function if provided
            if (onSave) {
                onSave(response.data.expense);
            }
        } catch (error) {
            console.error("Error adding expense:", error);
            setErrorMessage(error.response?.data?.message || "Failed to add expense.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">Add Expense</h2>

            {/* Error Message */}
            {errorMessage && <p className="text-red-600 font-semibold">{errorMessage}</p>}

            {/* Success Message */}
            {successMessage && <p className="text-green-600 font-semibold">{successMessage}</p>}

            {/* Category Selection */}
            <label className="block mb-2 text-gray-700">Category</label>
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border rounded-md mb-3"
                required
            >
                <option value="">Select Category</option>
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Utilities">Utilities</option>
                <option value="Shopping">Shopping</option>
                <option value="Other">Other</option>
            </select>
            {category === "Other" && (
                <input
                    type="text"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    placeholder="Enter your category"
                    className="w-full p-2 border rounded-md mb-3"
                    required
                />
            )}


            {/* Amount Input */}
            <label className="block mb-2 text-gray-700">Amount</label>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full p-2 border rounded-md mb-3"
                required
            />

            {/* Date Picker */}
            <label className="block mb-2 text-gray-700">Date</label>
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 border rounded-md mb-3"
                required
            />

            {/* Notes Input */}
            <label className="block mb-2 text-gray-700">Notes (Optional)</label>
            <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add details (optional)"
                className="w-full p-2 border rounded-md mb-3"
            ></textarea>

            {/* Save Button */}
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                disabled={loading}
            >
                {loading ? "Saving..." : "Save Expense"}
            </button>
        </form>
    );
};

export default AddExpenseForm;
