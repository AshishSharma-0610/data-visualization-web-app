const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.get('/new', customerController.getNewCustomers);
router.get('/repeat', customerController.getRepeatCustomers);
router.get('/geographical-distribution', customerController.getGeographicalDistribution);
router.get('/lifetime-value', customerController.getCustomerLifetimeValue);

module.exports = router;