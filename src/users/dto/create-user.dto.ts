import {IsEmail, IsIn, MinLength} from "class-validator";

export class CreateUserDto {
    name: string;
    phone?: string;

    @MinLength(6, {message: "Password must be at least 6 characters long"})
    password: string;

    @IsEmail()
    email: string;

    @IsIn(['admin', 'manager', 'consultant', 'user'], { message: "Role is not correct" })
    role: string;
}