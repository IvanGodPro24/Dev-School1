import { IsNotEmpty, IsString, IsEmail, IsDateString } from 'class-validator';

export class UpdateCustomerDto {
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsString()
    middleName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsDateString()
    birthDate: string;
}
