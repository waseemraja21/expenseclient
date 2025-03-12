import ExpenseCategoryChart from "../components/expenseAnalytics/ExpenseCategoryChart";
import MonthlyExpenseChart from "../components/expenseAnalytics/MonthlyExpenseChart";

const Analytics = () => {
    return (
        <div className="min-h-screen overflow-auto p-4 sm:p-6 bg-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-center">Expense Analytics</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-4 text-center md:text-left">Spending by Category</h3>
                    <div className="w-full h-[300px] sm:h-[400px]">
                        <ExpenseCategoryChart />
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-4 text-center md:text-left">Monthly Spending</h3>
                    <div className="w-full h-[300px] sm:h-[400px]">
                        <MonthlyExpenseChart />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
