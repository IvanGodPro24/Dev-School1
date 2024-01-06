const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    deleteOrder: async (orderId) => {
        return prisma.order.delete({
            where: {
                id: orderId,
            },
        });
    },
};
