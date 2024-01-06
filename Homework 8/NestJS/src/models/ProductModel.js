const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ProductModel {
    async getAllProducts() {
        return prisma.product.findMany();
    }

    async createProduct(productData) {
        return prisma.product.create({
            data: productData,
        });
    }
}

module.exports = new ProductModel();
