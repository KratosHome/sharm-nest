import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class CreateCategoryTranslationDto {
  @IsNotEmpty()
  @IsString()
  lang: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  metaTitle: string;

  @IsNotEmpty()
  @IsString()
  metaKeywords: string;

  @IsNotEmpty()
  @IsString()
  metaDescription: string;
}

export class CreateCategoryDto {
  @ApiProperty({ example: '', description: 'image' })
  @IsNotEmpty()
  @IsString()
  metaImages?: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID parent menu item',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  parentId?: string;

  @ApiProperty({
    type: [CreateCategoryTranslationDto],
    description: 'translations for menu item',
    example: [
      {
        name: 'Home',
        description: 'text',
        metaTitle: 'text',
        metaKeywords: 'text',
        metaDescription: 'text',
        lang: 'en',
      },
    ],
  })
  translations: CreateCategoryTranslationDto[];
}
