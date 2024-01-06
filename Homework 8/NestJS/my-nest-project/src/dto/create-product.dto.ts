import { IsNotEmpty, IsString, IsInt, IsNumber, IsPositive } from 'class-validator';

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    category: string;

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    amount: number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    price: number;
}
