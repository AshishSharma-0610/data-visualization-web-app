import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getTotalSales } from '../services/api';
import '../assets/styles.css';

const TotalSalesChart = ({ interval }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                const result = await getTotalSales(interval);
                // Check if result is an array and has data
                if (Array.isArray(result) && result.length > 0) {
                    setData(result);
                } else {
                    console.error('No data received or data is in an unexpected format:', result);
                }
            } catch (error) {
                console.error('Error fetching total sales data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSalesData();
    }, [interval]);

    if (loading) {
        return <div className="chart-container">Loading chart...</div>;
    }

    return (
        <div className="chart-wrapper">
            <h2 className="chart-title">Total Sales Over Time: By Month</h2>
            <div className="chart-container">
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="_id" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="totalSales" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default TotalSalesChart;
