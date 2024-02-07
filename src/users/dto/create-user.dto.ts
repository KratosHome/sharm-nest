import {IsEmail, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({required: false})
    name?: string;

    @ApiProperty({required: false})
    surname?: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty({required: false})
    phone?: string;

    @ApiProperty()
    @MinLength(6, {message: "Password must be at least 6 characters long"})
    password: string;
}