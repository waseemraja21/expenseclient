import ExpenseChart from "./ExpenseChart";

const Dashboard = () => {
    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center max-w-4xl mx-auto w-full">
            <h2 className="text-xl font-semibold mb-2">Total Balance</h2>
            <p className="text-3xl text-green-600 font-bold mb-4">$1200</p>
            <div className="w-full overflow-x-auto">
                <ExpenseChart />
            </div>
        </div>
    );
};

export default Dashboard;
