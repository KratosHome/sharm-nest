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
    @ApiProperty({example: '', description: 'image'})
    @IsNotEmpty()
    @IsString()
    icons: string;

    @ApiProperty({
        example: '123e4567-e89b-12d3-a456-426614174000',
        description: 'ID parent menu item',
        required: false
    })
    @IsOptional()
    @IsUUID()
    parentId?: string;

    @ApiProperty({
        type: [CreateMenuTranslationDto],
        description: 'translations for menu item',
        example: [{
            name: 'Home',
            url: '/home',
            lang: 'en'
        }]
    })
    @IsOptional()
    translations: CreateMenuTranslationDto[];
}
