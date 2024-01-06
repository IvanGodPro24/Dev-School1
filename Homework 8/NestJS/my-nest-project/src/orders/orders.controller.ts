import { Body, Controller, Get, Post, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { OrderService } from './orders.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { EntityNotFoundException } from '../Exceptions/NotFoundException';
import { EntityExistsValidationPipe } from '../Exceptions/EntityExistsValidationPipe';

@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post()
    createOrder(@Body() createOrderDto: CreateOrderDto) {
        return this.orderService.createOrder(createOrderDto);
    }

    @Get()
    getAllOrders() {
        return this.orderService.getAllOrders();
    }

    @Patch(':orderId')
    @UsePipes(new ValidationPipe({ transform: true }))
    updateOrder(@Param('orderId', EntityExistsValidationPipe) orderId: number, @Body() updateOrderDto: UpdateOrderDto) {
        const updatedOrder = this.orderService.updateOrder(orderId, updateOrderDto);
        if (!updatedOrder) {
            throw new EntityNotFoundException('Order', orderId);
        }
        return updatedOrder;
    }

    @Delete(':orderId')
    deleteOrder(@Param('orderId', EntityExistsValidationPipe) orderId: number) {
        const deletedOrder = this.orderService.deleteOrder(orderId);
        if (!deletedOrder) {
            throw new EntityNotFoundException('Order', orderId);
        }
        return deletedOrder;
    }
}
