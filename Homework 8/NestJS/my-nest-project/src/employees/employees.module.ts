import { Module } from '@nestjs/common';
import { EmployeeController } from './employees.controller';
import { EmployeeService } from './employees.service';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
