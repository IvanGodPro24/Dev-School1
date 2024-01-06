import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';

@Injectable()
export class EmployeeService {
    private employees = [];

    createEmployee(createEmployeeDto: CreateEmployeeDto) {
        const newEmployee = { id: this.employees.length + 1, ...createEmployeeDto };
        this.employees.push(newEmployee);
        return newEmployee;
    }

    getAllEmployees() {
        return this.employees;
    }

    updateEmployee(employeeId: number, updateEmployeeDto: UpdateEmployeeDto) {
        const employeeIndex = this.employees.findIndex((employee) => employee.id === employeeId);

        if (employeeIndex !== -1) {
            this.employees[employeeIndex] = { ...this.employees[employeeIndex], ...updateEmployeeDto };
            return this.employees[employeeIndex];
        }

        return null;
    }

    deleteEmployee(employeeId: number) {
        const employeeIndex = this.employees.findIndex((employee) => employee.id === employeeId);

        if (employeeIndex !== -1) {
            const deletedEmployee = this.employees.splice(employeeIndex, 1);
            return deletedEmployee[0];
        }

        throw new NotFoundException(`Employee with ID ${employeeId} not found`);
    }
}
