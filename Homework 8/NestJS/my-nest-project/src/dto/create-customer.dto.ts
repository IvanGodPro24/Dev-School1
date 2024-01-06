import { IsNotEmpty, IsString, IsEmail, IsDate } from 'class-validator';

export class CreateCustomerDto {
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
    @IsDate()
    birthDate: Date;
}
