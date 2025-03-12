import { useState } from "react";
import AddExpenseForm from "../components/AddExpenseForm";
import { useNavigate } from "react-router-dom";

const AddExpense = () => {
    const [expenses, setExpenses] = useState([]);
    const navigate = useNavigate();

    const handleSaveExpense = (newExpense) => {
        setExpenses([...expenses, newExpense]);
        alert("Expense added successfully!");
        navigate("/"); // Redirect to Home after saving
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 sm:p-6 md:p-8">
            <h1 className="text-2xl font-bold mb-4 text-center">Add Expense</h1>
            <div className="w-full max-w-2xl">
                <AddExpenseForm onSave={handleSaveExpense} />
            </div>
        </div>
    );
};

export default AddExpense;
