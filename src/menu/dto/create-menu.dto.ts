// Додайте цей клас для опису структури перекладу
import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsOptional, IsString, IsUUID} from "class-validator";

class CreateMenuTranslationDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    url: string;

    @IsNotEmpty()
    @IsString()
    lang: string;
}

export class CreateMenuDto {
    @ApiProperty({example: 'icon-home', description: 'Іконка пункту меню'})
    @IsNotEmpty()
    @IsString()
    icons: string;

    @ApiProperty({
        example: '123e4567-e89b-12d3-a456-426614174000',
        description: 'ID батьківського пункту меню',
        required: false
    })
    @IsOptional()
    @IsUUID()
    parentId?: string;

    @IsOptional()
    translations: CreateMenuTranslationDto[];
}
