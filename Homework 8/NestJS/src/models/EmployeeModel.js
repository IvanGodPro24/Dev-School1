const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    getAllEmployees: async () => {
        return prisma.employee.findMany();
    },
    createEmployee: async (data) => {
        return prisma.employee.create({
            data: {
                ...data,
            },
        });
    },
    getEmployeeById: async (employeeId) => {
        return prisma.employee.findUnique({
            where: {
                id: employeeId,
            },
        });
    },
    updateEmployee: async (employeeId, data) => {
        return prisma.employee.update({
            where: {
                id: employeeId,
            },
            data: {
                ...data,
            },
        });
    },
};
