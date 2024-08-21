import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getCohortLifetimeValue } from '../services/api';
import '../assets/styles.css';

const CohortLifetimeValueChart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCohortData = async () => {
            try {
                const result = await getCohortLifetimeValue();
                setData(result);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching customer lifetime value data:', error);
                setLoading(false);
            }
        };

        fetchCohortData();
    }, []);

    if (loading) {
        return <div className="chart-container">Loading chart...</div>;
    }

    return (
        <div className="chart-wrapper">
            <h2 className="chart-title">Customer Lifetime Value by Cohorts:</h2>
            <div className="chart-container">
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="cohort" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="totalLifetimeValue" fill="#8884d8" />
                        <Bar dataKey="averageLifetimeValue" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default CohortLifetimeValueChart;
