import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getRepeatCustomers } from '../services/api';
import '../assets/styles.css';

const RepeatCustomersChart = ({ interval }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRepeatCustomersData = async () => {
            try {
                const result = await getRepeatCustomers(interval);
                // Check if result is an array and contains data
                if (Array.isArray(result) && result.length > 0) {
                    setData(result);
                } else {
                    setData([{ _id: 'No Data', repeatCustomers: 0 }]);
                }
            } catch (error) {
                console.error('Error fetching repeat customers data:', error);
                // Provide fallback data in case of error
                setData([{ _id: 'Error', repeatCustomers: 0 }]);
            } finally {
                setLoading(false);
            }
        };

        fetchRepeatCustomersData();
    }, [interval]);

    if (loading) {
        return <div className="chart-container">Loading chart...</div>;
    }

    return (
        <div className="chart-wrapper">
            <h2 className="chart-title">Number of Repeat Customers: By Month</h2>
            <div className="chart-container">
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="_id" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="repeatCustomers" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default RepeatCustomersChart;
