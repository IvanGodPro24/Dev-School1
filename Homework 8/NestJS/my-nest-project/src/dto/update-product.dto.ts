import { IsNotEmpty, IsString, IsInt, IsNumber } from 'class-validator';

export class UpdateProductDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    category: string;

    @IsNotEmpty()
    @IsInt()
    amount: number;

    @IsNotEmpty()
    @IsNumber()
    price: number;
}
