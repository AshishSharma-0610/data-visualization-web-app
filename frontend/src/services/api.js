import axios from 'axios';

const API_URL = 'https://data-visualization-web-app.onrender.com';

// Fetch total sales over time
export const getTotalSales = async (interval) => {
    const response = await axios.get(`${API_URL}/api/sales/total`, {
        params: { interval }
    });
    return response.data;
};

// Fetch sales growth rate over time
export const getSalesGrowth = async (interval) => {
    const response = await axios.get(`${API_URL}/api/sales/growth-rate`, {
        params: { interval }
    });
    return response.data;
};

// Fetch new customers added over time
export const getNewCustomers = async (interval) => {
    const response = await axios.get(`${API_URL}/api/customers/new`, {
        params: { interval }
    });
    return response.data;
};

// Fetch number of repeat customers
export const getRepeatCustomers = async (interval) => {
    const response = await axios.get(`${API_URL}/api/customers/repeat`, {
        params: { interval }
    });
    return response.data;
};

// Fetch geographical distribution of customers
export const getGeoDistribution = async () => {
    const response = await axios.get(`${API_URL}/api/customers/geographical-distribution`);
    return response.data;
};


// Fetch customer lifetime value by cohorts
export const getCohortLifetimeValue = async () => {
    const response = await axios.get(`${API_URL}/api/customers/lifetime-value`);
    return response.data;
};
