import {ApiProperty, PartialType} from '@nestjs/swagger';
import { CreateMenuDto } from './create-menu.dto';
import {IsOptional, IsString, IsUUID} from "class-validator";

export class UpdateMenuDto extends PartialType(CreateMenuDto) {
    @ApiProperty({ example: 'Головна', description: 'Назва пункту меню', required: false })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({ example: '/home', description: 'URL пункту меню', required: false })
    @IsOptional()
    @IsString()
    url?: string;

    @ApiProperty({ example: 'icon-home', description: 'Іконка пункту меню', required: false })
    @IsOptional()
    @IsString()
    icons?: string;
}
