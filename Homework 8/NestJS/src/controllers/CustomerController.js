const express = require('express');
const customerModel = require('../models/CustomerModel');

class CustomerController {
    async getAllCustomers(req, res) {
        const customers = await customerModel.getAllCustomers();
        res.json(customers);
    }

    async createCustomer(req, res) {
        const customerData = req.body;
        const newCustomer = await customerModel.createCustomer(customerData);
        res.json(newCustomer);
    }
}

module.exports = new CustomerController();
