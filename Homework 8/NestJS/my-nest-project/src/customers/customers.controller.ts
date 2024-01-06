import { Body, Controller, Get, Post, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { CustomerService } from './customers.service';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { EntityNotFoundException } from '../Exceptions/NotFoundException';
import { EntityExistsValidationPipe } from '../Exceptions/EntityExistsValidationPipe';

@Controller('customers')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) {}

    @Post()
    createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
        return this.customerService.createCustomer(createCustomerDto);
    }

    @Get()
    getAllCustomers() {
        return this.customerService.getAllCustomers();
    }

    @Patch(':customerId')
    @UsePipes(new ValidationPipe({ transform: true }))
    updateCustomer(
        @Param('customerId', EntityExistsValidationPipe) customerId: number,
        @Body() updateCustomerDto: UpdateCustomerDto,
    ) {
        const updatedCustomer = this.customerService.updateCustomer(customerId, updateCustomerDto);
        if (!updatedCustomer) {
            throw new EntityNotFoundException('Customer', customerId);
        }
        return updatedCustomer;
    }

    @Delete(':customerId')
    deleteCustomer(@Param('customerId', EntityExistsValidationPipe) customerId: number) {
        const deletedCustomer = this.customerService.deleteCustomer(customerId);
        if (!deletedCustomer) {
            throw new EntityNotFoundException('Customer', customerId);
        }
        return deletedCustomer;
    }
}
