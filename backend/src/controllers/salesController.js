const { getDB } = require('../config/database');

exports.getTotalSales = async (req, res) => {
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

        const result = await db.collection('shopifyOrders').aggregate([
            {
                $group: {
                    _id: groupBy,
                    totalSales: { $sum: { $toDouble: "$total_price_set.shop_money.amount" } }
                }
            },
            { $sort: { _id: 1 } }
        ]).toArray();

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getSalesGrowthRate = async (req, res) => {
    try {
        const db = getDB();
        const { interval } = req.query;

        let groupBy;
        switch (interval) {
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

        const salesData = await db.collection('shopifyOrders').aggregate([
            {
                $group: {
                    _id: groupBy,
                    totalSales: { $sum: { $toDouble: "$total_price_set.shop_money.amount" } }
                }
            },
            { $sort: { _id: 1 } }
        ]).toArray();

        const growthRates = salesData.map((current, index, array) => {
            if (index === 0) return { period: current._id, growthRate: null };
            const previous = array[index - 1];
            const growthRate = ((current.totalSales - previous.totalSales) / previous.totalSales) * 100;
            return { period: current._id, growthRate: parseFloat(growthRate.toFixed(2)) };
        });

        res.json(growthRates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};