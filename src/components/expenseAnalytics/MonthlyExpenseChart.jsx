import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../context/AuthContext";

const MonthlyExpenseChart = () => {
    const [data, setData] = useState([]);
    const { currentUser } = useContext(UserContext);
    const token = currentUser?.token;
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        axios.get(`${BASE_URL}/expenses/monthly`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                const formattedData = res.data.map(item => ({
                    name: `${item._id.month}/${item._id.year}`,
                    totalAmount: item.totalAmount
                }));
                setData(formattedData);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="flex justify-center items-center w-full p-4">
            <div className="w-full max-w-4xl">
                <ResponsiveContainer width="100%" height={window.innerWidth < 640 ? 250 : 400}>
                    <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                        <XAxis dataKey="name" tick={{ fontSize: window.innerWidth < 640 ? 10 : 14 }} />
                        <YAxis tick={{ fontSize: window.innerWidth < 640 ? 10 : 14 }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="totalAmount" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default MonthlyExpenseChart;
