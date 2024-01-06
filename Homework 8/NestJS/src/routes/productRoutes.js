const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const productController = require('../controllers/ProductController');

const validateProduct = [
    body('name').notEmpty().withMessage('Name cannot be empty'),
    body('category').notEmpty().withMessage('Category cannot be empty'),
    body('amount').isInt().withMessage('Amount must be an integer'),
    body('price').isFloat().withMessage('Price must be a float'),
];

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

router.get('/', productController.getAllProducts);
router.post('/', validateProduct, handleValidationErrors, productController.createProduct);

module.exports = router;
