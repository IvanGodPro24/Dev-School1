const OrderModel = require('../models/OrderModel');

module.exports = {
    deleteOrder: async (req, res) => {
        const orderId = parseInt(req.params.orderId);

        try {
            const deletedOrder = await OrderModel.deleteOrder(orderId);

            if (!deletedOrder) {
                return res.status(404).json({ error: 'Order not found' });
            }

            return res.status(200).json(deletedOrder);
        } catch (error) {
            console.error('Error deleting order:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};
