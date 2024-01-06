import { Body, Controller, Get, Post, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { EmployeeService } from './employees.service';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';
import { EntityNotFoundException } from '../Exceptions/NotFoundException';
import { EntityExistsValidationPipe } from '../Exceptions/EntityExistsValidationPipe';

@Controller('employees')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) {}

    @Post()
    createEmployee(@Body() createEmployeeDto: CreateEmployeeDto) {
        return this.employeeService.createEmployee(createEmployeeDto);
    }

    @Get()
    getAllEmployees() {
        return this.employeeService.getAllEmployees();
    }

    @Patch(':employeeId')
    @UsePipes(new ValidationPipe({ transform: true }))
    updateEmployee(
        @Param('employeeId', EntityExistsValidationPipe) employeeId: number,
        @Body() updateEmployeeDto: UpdateEmployeeDto,
    ) {
        const updatedEmployee = this.employeeService.updateEmployee(employeeId, updateEmployeeDto);
        if (!updatedEmployee) {
            throw new EntityNotFoundException('Employee', employeeId);
        }
        return updatedEmployee;
    }

    @Delete(':employeeId')
    deleteEmployee(@Param('employeeId', EntityExistsValidationPipe) employeeId: number) {
        const deletedEmployee = this.employeeService.deleteEmployee(employeeId);
        if (!deletedEmployee) {
            throw new EntityNotFoundException('Employee', employeeId);
        }
        return deletedEmployee;
    }
}