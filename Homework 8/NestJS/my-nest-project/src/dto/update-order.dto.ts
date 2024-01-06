import { IsString, IsNotEmpty, IsInt, IsNumber, IsDateString } from 'class-validator';

export class UpdateOrderDto {
    @IsNotEmpty()
    @IsInt()
    employeeId: number;

    @IsNotEmpty()
    @IsInt()
    customerId: number;

    @IsNotEmpty()
    @IsString()
    orderAddress: string;

    @IsNotEmpty()
    @IsNumber()
    deliveryCost: number;

    @IsNotEmpty()
    @IsDateString()
    orderDate: string;
}
