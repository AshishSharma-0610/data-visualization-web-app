import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getSalesGrowth } from '../services/api';
import '../assets/styles.css';

const SalesGrowthChart = ({ interval }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGrowthData = async () => {
            try {
                const result = await getSalesGrowth(interval);
                // Ensure result is an array and has data
                if (Array.isArray(result) && result.length > 0) {
                    setData(result);
                } else {
                    console.error('No data received or data is in an unexpected format:', result);
                }
            } catch (error) {
                console.error('Error fetching sales growth data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGrowthData();
    }, [interval]);

    if (loading) {
        return <div className="chart-container">Loading chart...</div>;
    }

    return (
        <div className="chart-wrapper">
            <h2 className="chart-title">Sales Growth Rate Over Time: By Quarter</h2>
            <div className="chart-container">
                <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="period" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="growthRate" stroke="#82ca9d" fill="#82ca9d" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SalesGrowthChart;
