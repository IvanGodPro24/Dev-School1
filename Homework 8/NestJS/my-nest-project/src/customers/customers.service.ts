import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';

@Injectable()
export class CustomerService {
    private customers = [];

    createCustomer(createCustomerDto: CreateCustomerDto) {
        const newCustomer = { id: this.customers.length + 1, ...createCustomerDto };
        this.customers.push(newCustomer);
        return newCustomer;
    }

    getAllCustomers() {
        return this.customers;
    }

    updateCustomer(customerId: number, updateCustomerDto: UpdateCustomerDto) {
        const customerIndex = this.customers.findIndex((customer) => customer.id === customerId);
        if (customerIndex !== -1) {
            this.customers[customerIndex] = { ...this.customers[customerIndex], ...updateCustomerDto };
            return this.customers[customerIndex];
        }
        return null;
    }

    deleteCustomer(customerId: number) {
        const customerIndex = this.customers.findIndex((customer) => customer.id === customerId);
        if (customerIndex !== -1) {
            const deletedCustomer = this.customers.splice(customerIndex, 1)[0];
            return deletedCustomer;
        }
        return null;
    }
}