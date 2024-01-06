const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class CustomerModel {
    async getAllCustomers() {
        return prisma.customer.findMany();
    }

    async createCustomer(customerData) {
        return prisma.customer.create({
            data: customerData,
        });
    }
}

module.exports = new CustomerModel();
