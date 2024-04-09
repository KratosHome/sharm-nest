import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateMenuDto } from './create-menu.dto';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

class UpdateMenuTranslationDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  url: string;
}

export class UpdateMenuDto {
  @ApiProperty({ example: '', description: 'image' })
  @IsNotEmpty()
  @IsString()
  icons: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID parent menu item',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  parentId?: string;

  @ApiProperty({
    type: [UpdateMenuTranslationDto],
    description: 'translations for menu item',
    example: [
      {
        name: 'Home',
        url: '/home',
      },
    ],
  })
  translations: UpdateMenuTranslationDto[];
}
