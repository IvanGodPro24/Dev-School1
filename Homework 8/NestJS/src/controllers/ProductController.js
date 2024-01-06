const express = require('express');
const ProductModel = require('../models/ProductModel');
const { validationResult } = require('express-validator');

class ProductController {
    async getAllProducts(req, res) {
        const products = await ProductModel.getAllProducts();
        res.json(products);
    }

    async createProduct(req, res) {
        const productData = req.body;

        try {
            const newProduct = await ProductModel.createProduct(productData);
            res.status(201).json(newProduct);
        } catch (error) {
            console.error('Error creating product:', error);
            res.status(500).json({ error: 'Internal Server Error', details: error.message });
        }
    }

}

module.exports = new ProductController();
