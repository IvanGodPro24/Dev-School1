import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEmployeeDto {
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsString()
    middleName: string;

    @IsNotEmpty()
    @IsString()
    position: string;
}
