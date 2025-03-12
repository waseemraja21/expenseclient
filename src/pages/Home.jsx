import Dashboard from "../components/Dashboard";
import RecentTransactions from "../components/RecentTransactions";
import AddExpenseButton from "../components/AddExpenseButton";
import { UserContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import SetBudget from "../components/mybudget/SetBudget";
import BudgetProgress from "../components/BudgetProgress";

const Home = () => {
    const { currentUser: user } = useContext(UserContext)
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) navigate("/login");
    }, [user, navigate]);

    return (
        <div className="h-screen w-full bg-gray-100 flex flex-col">
            <div className="flex-1 w-full max-w-6xl mx-auto gap-2 p-2">
                <div className="lg:col-span-2 w-full">
                    <Dashboard className="w-full" />
                </div>
                <div className="flex flex-col space-y-2">
                    <RecentTransactions />
                    <AddExpenseButton />
                    <SetBudget />
                    <BudgetProgress />
                </div>
            </div>
        </div>
    );

};

export default Home;
