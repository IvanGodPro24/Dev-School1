const express = require('express');
const router = express.Router();
const orderController = require('../controllers/OrderController');

router.delete('/:orderId', orderController.deleteOrder);

module.exports = router;
