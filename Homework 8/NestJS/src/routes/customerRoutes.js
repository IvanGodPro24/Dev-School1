const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const customerController = require('../controllers/CustomerController');
const prisma = require('@prisma/client');

const validateCustomer = [
    body('firstName').notEmpty().withMessage('First name cannot be empty'),
    body('lastName').notEmpty().withMessage('Last name cannot be empty'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('birthDate').optional().isISO8601().toDate().withMessage('Invalid birth date format'),
];

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

router.get('/:customerId/orders', async (req, res) => {
    const customerId = parseInt(req.params.customerId);

    try {
        const orders = await prisma.order.findMany({
            where: {
                customerId: customerId,
            },
            select: {
                id: true,
                customerId: true,
                employeeId: true,
                address: true,
                deliveryCost: true,
                orderDate: true,
                products: {
                    select: {
                        price: true,
                        amount: true,
                    },
                },
            },
        });


        const totalCost = orders.reduce((acc, order) => {
            const orderTotalCost =
                order.products.reduce((productCost, product) => productCost + product.price * product.amount, 0) +
                order.deliveryCost;

            return acc + orderTotalCost;
        }, 0);

        return res.status(200).json({ orders, totalCost });
    } catch (error) {
        console.error('Error fetching customer orders:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/', customerController.getAllCustomers);
router.post('/', validateCustomer, handleValidationErrors, customerController.createCustomer);

module.exports = router;
