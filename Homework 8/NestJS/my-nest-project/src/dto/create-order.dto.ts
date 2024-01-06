import { IsNotEmpty, IsInt, IsNumber, IsDate } from 'class-validator';

export class CreateOrderDto {
    @IsNotEmpty()
    @IsInt()
    employeeId: number;

    @IsNotEmpty()
    @IsInt()
    customerId: number;

    @IsNotEmpty()
    @IsDate()
    orderDate: Date;

    @IsNotEmpty()
    orderAddress: string;

    @IsNotEmpty()
    @IsNumber()
    deliveryCost: number;
}
