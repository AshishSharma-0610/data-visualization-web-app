// src/pages/Dashboard.js
import React, { useState } from 'react';
import './Dashboard.css';
import TotalSalesChart from '../charts/TotalSalesChart';
import SalesGrowthChart from '../charts/SalesGrowthChart';
import NewCustomersChart from '../charts/NewCustomersChart';
import RepeatCustomersChart from '../charts/RepeatCustomersChart';
import GeoDistributionMap from '../charts/GeoDistributionMap';
import CohortLifetimeValueChart from '../charts/CohortLifetimeValueChart';

const Dashboard = () => {
    const [expandedChart, setExpandedChart] = useState(null);

    const toggleExpand = (chartId) => {
        setExpandedChart(expandedChart === chartId ? null : chartId);
    };

    const chartComponents = {
        totalSales: { component: TotalSalesChart, props: { interval: "monthly" } },
        salesGrowth: { component: SalesGrowthChart, props: { interval: "quarterly" } },
        newCustomers: { component: NewCustomersChart, props: { interval: "monthly" } },
        repeatCustomers: { component: RepeatCustomersChart, props: { interval: "monthly" } },
        geoDistribution: { component: GeoDistributionMap, props: {} },
        cohortLifetime: { component: CohortLifetimeValueChart, props: {} },
    };

    const renderChart = (chartId) => {
        const { component: ChartComponent, props } = chartComponents[chartId];
        return (
            <div
                className={`chart-container ${expandedChart === chartId ? 'expanded' : ''}`}
                key={chartId}
            >
                <ChartComponent {...props} />
                <button className="expand-btn" onClick={() => toggleExpand(chartId)}>
                    {expandedChart === chartId ? '←' : '→'}
                </button>
            </div>
        );
    };

    return (
        <>
            <div className="dashboard">
                <div className="charts-group-1">
                    {renderChart('totalSales')}
                    {renderChart('salesGrowth')}
                    {renderChart('newCustomers')}
                    {renderChart('repeatCustomers')}
                </div>
                <div className="charts-group-2">
                    {renderChart('cohortLifetime')}
                    {renderChart('geoDistribution')}
                </div>
            </div>
            <div className={`overlay ${expandedChart ? 'active' : ''}`} onClick={() => setExpandedChart(null)}></div>
        </>
    );
};

export default Dashboard;