import {IsNotEmpty, IsOptional, IsString, IsNumber, IsUUID} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CreateMenuDto {
    @ApiProperty({ example: 'Головна', description: 'Назва пункту меню' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ example: '/home', description: 'URL пункту меню' })
    @IsNotEmpty()
    @IsString()
    url: string;

    @ApiProperty({ example: 'icon-home', description: 'Іконка пункту меню' })
    @IsNotEmpty()
    @IsString()
    icons: string;

    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'ID батьківського пункту меню', required: false })
    @IsOptional()
    @IsUUID()
    parentId?: string;
}

