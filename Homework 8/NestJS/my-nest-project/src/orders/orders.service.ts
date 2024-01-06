import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';

@Injectable()
export class OrderService {
    private orders = [];

    createOrder(createOrderDto: CreateOrderDto) {
        const newOrder = { id: this.orders.length + 1, ...createOrderDto };
        this.orders.push(newOrder);
        return newOrder;
    }

    getAllOrders() {
        return this.orders;
    }

    updateOrder(orderId: number, updateOrderDto: UpdateOrderDto) {
        const orderIndex = this.orders.findIndex((order) => order.id === orderId);
        if (orderIndex !== -1) {
            this.orders[orderIndex] = { ...this.orders[orderIndex], ...updateOrderDto };
            return this.orders[orderIndex];
        }
        return null;
    }

    deleteOrder(orderId: number) {
        const orderIndex = this.orders.findIndex((order) => order.id === orderId);
        if (orderIndex !== -1) {
            const deletedOrder = this.orders.splice(orderIndex, 1)[0];
            return deletedOrder;
        }
        return null;
    }
}