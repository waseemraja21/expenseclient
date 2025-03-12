import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useContext, useEffect, useState } from 'react';
import { UserContext } from "../../context/AuthContext";
import axios from 'axios';

const ExpenseCategoryChart = () => {
    const [data, setData] = useState([]);
    const { currentUser } = useContext(UserContext);
    const token = currentUser?.token;
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        axios.get(`${BASE_URL}/expenses/bycategory`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => setData(res.data))
            .catch(err => console.error(err));
    }, []);

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#D84315", "#6A1B9A"];

    return (
        <div className="flex justify-center items-center w-full p-4">
            <div className="w-full max-w-xl">
                <PieChart width={window.innerWidth < 640 ? 300 : 400} height={window.innerWidth < 640 ? 300 : 400}>
                    <Pie
                        data={data}
                        dataKey="totalAmount"
                        nameKey="_id"
                        cx="50%"
                        cy="50%"
                        outerRadius={window.innerWidth < 640 ? 80 : 100}
                        fill="#8884d8"
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </div>
        </div>
    );
};

export default ExpenseCategoryChart;
