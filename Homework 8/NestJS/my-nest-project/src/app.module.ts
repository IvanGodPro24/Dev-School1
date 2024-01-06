import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CustomersModule } from './customers/customers.module';
import { EmployeeModule } from './employees/employees.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [ProductsModule, CustomersModule, EmployeeModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
