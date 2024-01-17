import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CreateMenuDto {

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    url: string;

    @IsNotEmpty()
    @IsString()
    icons: string;

}

