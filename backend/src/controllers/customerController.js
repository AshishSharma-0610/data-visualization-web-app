const { getDB } = require('../config/database');

exports.getNewCustomers = async (req, res) => {
    try {
        const db = getDB();
        const { interval } = req.query;

        let groupBy;
        switch (interval) {
            case 'daily':
                groupBy = { $dateToString: { format: "%Y-%m-%d", date: { $toDate: "$created_at" } } };
                break;
            case 'monthly':
                groupBy = { $dateToString: { format: "%Y-%m", date: { $toDate: "$created_at" } } };
                break;
            case 'quarterly':
                groupBy = {
                    $concat: [
                        { $dateToString: { format: "%Y-Q", date: { $toDate: "$created_at" } } },
                        { $toString: { $ceil: { $divide: [{ $month: { $toDate: "$created_at" } }, 3] } } }
                    ]
                };
                break;
            case 'yearly':
                groupBy = { $dateToString: { format: "%Y", date: { $toDate: "$created_at" } } };
                break;
            default:
                return res.status(400).json({ message: "Invalid interval" });
        }

        const result = await db.collection('shopifyCustomers').aggregate([
            {
                $group: {
                    _id: groupBy,
                    newCustomers: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]).toArray();

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getRepeatCustomers = async (req, res) => {
    try {
        const db = getDB();
        const { interval } = req.query;

        let groupBy;
        switch (interval) {
            case 'daily':
                groupBy = { $dateToString: { format: "%Y-%m-%d", date: { $toDate: "$created_at" } } };
                break;
            case 'monthly':
                groupBy = { $dateToString: { format: "%Y-%m", date: { $toDate: "$created_at" } } };
                break;
            case 'quarterly':
                groupBy = {
                    $concat: [
                        { $dateToString: { format: "%Y-Q", date: { $toDate: "$created_at" } } },
                        { $toString: { $ceil: { $divide: [{ $month: { $toDate: "$created_at" } }, 3] } } }
                    ]
                };
                break;
            case 'yearly':
                groupBy = { $dateToString: { format: "%Y", date: { $toDate: "$created_at" } } };
                break;
            default:
                return res.status(400).json({ message: "Invalid interval" });
        }

        const result = await db.collection('shopifyCustomers').aggregate([
            { $match: { orders_count: { $gt: 1 } } },
            {
                $group: {
                    _id: groupBy,
                    repeatCustomers: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]).toArray();

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getGeographicalDistribution = async (req, res) => {
    try {
        const db = getDB();
        const result = await db.collection('shopifyCustomers').aggregate([
            {
                $group: {
                    _id: "$default_address.city",
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } }
        ]).toArray();

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCustomerLifetimeValue = async (req, res) => {
    try {
        const db = getDB();
        const result = await db.collection('shopifyCustomers').aggregate([
            {
                $addFields: {
                    cohort: { $dateToString: { format: "%Y-%m", date: { $toDate: "$created_at" } } }
                }
            },
            {
                $group: {
                    _id: "$cohort",
                    customerCount: { $sum: 1 },
                    totalLifetimeValue: { $sum: { $toDouble: "$total_spent" } }
                }
            },
            {
                $project: {
                    cohort: "$_id",
                    customerCount: 1,
                    totalLifetimeValue: 1,
                    averageLifetimeValue: { $divide: ["$totalLifetimeValue", "$customerCount"] }
                }
            },
            { $sort: { cohort: 1 } }
        ]).toArray();

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};