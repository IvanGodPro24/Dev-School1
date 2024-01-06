const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const employeeController = require('../controllers/EmployeeController');

const validateEmployee = [
    body('firstName').notEmpty().withMessage('First name cannot be empty'),
    body('lastName').notEmpty().withMessage('Last name cannot be empty'),
    body('middleName').optional(),
    body('position').notEmpty().withMessage('Position cannot be empty'),
];

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

router.get('/', employeeController.getAllEmployees);
router.post('/', validateEmployee, handleValidationErrors, employeeController.createEmployee);
router.get('/:employeeId', employeeController.getEmployeeById);
router.patch('/:employeeId', validateEmployee, handleValidationErrors, employeeController.updateEmployee);

module.exports = router;
