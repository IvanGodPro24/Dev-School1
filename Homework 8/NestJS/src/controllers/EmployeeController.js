const EmployeeModel = require('../models/EmployeeModel');
const prisma = require('@prisma/client');
const { body, validationResult } = require('express-validator');

module.exports = {
    getAllEmployees: async (req, res) => {
        try {
            const employees = await EmployeeModel.getAllEmployees();
            return res.status(200).json(employees);
        } catch (error) {
            console.error('Error fetching employees:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    createEmployee: async (req, res) => {
        const { firstName, lastName, middleName, position } = req.body;

        try {
            const newEmployee = await EmployeeModel.createEmployee({
                firstName,
                lastName,
                middleName,
                position,
            });

            return res.status(201).json(newEmployee);
        } catch (error) {
            console.error('Error creating employee:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    getEmployeeById: async (req, res) => {
        const employeeId = parseInt(req.params.employeeId);

        try {
            const employee = await EmployeeModel.getEmployeeById(employeeId);

            if (!employee) {
                return res.status(404).json({ error: 'Employee not found' });
            }

            return res.status(200).json(employee);
        } catch (error) {
            console.error('Error fetching employee:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    updateEmployee: [
        body('position').notEmpty().withMessage('Position cannot be empty'),

        async (req, res) => {
            const employeeId = parseInt(req.params.employeeId);
            const { firstName, lastName, middleName, position } = req.body;

            // Перевірка помилок валідації
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            try {
                const updatedEmployee = await EmployeeModel.updateEmployee(employeeId, {
                    firstName,
                    lastName,
                    middleName,
                    position,
                });

                if (!updatedEmployee) {
                    return res.status(404).json({ error: 'Employee not found' });
                }

                return res.status(200).json(updatedEmployee);
            } catch (error) {
                console.error('Error updating employee:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        },
    ],
};
