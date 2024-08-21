const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');

router.get('/total', salesController.getTotalSales);
router.get('/growth-rate', salesController.getSalesGrowthRate);

module.exports = router;