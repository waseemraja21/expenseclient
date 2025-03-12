import { useNavigate } from "react-router-dom";

const AddExpenseButton = () => {
    const navigate = useNavigate();

    return (
        <div className="flex justify-center sm:justify-start mt-4">
            <button
                className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition"
                onClick={() => navigate("/add-expense")}
            >
                + Add Expense
            </button>
        </div>
    );
};

export default AddExpenseButton;
