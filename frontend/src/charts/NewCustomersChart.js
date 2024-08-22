import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getNewCustomers } from '../services/api';
import '../assets/styles.css'

const NewCustomersChart = ({ interval }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCustomersData = async () => {
            try {
                const result = await getNewCustomers(interval);
                setData(result);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching new customers data:', error);
                setLoading(false);
            }
        };

        fetchCustomersData();
    }, [interval]);

    if (loading) {
        return <div className="chart-container">Loading chart...</div>;
    }

    return (
        <div className="chart-wrapper">
            <h2 className="chart-title">New Customers Added Over Time: By Month</h2>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="_id" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="newCustomers" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default NewCustomersChart;
