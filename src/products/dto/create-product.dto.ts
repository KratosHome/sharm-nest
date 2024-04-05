import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class CreateProductTranslationDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  subTitle: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  shortDescription: string;

  @IsNotEmpty()
  @IsString()
  metaTitle: string;

  @IsNotEmpty()
  @IsString()
  metaKeywords: string;

  @IsNotEmpty()
  @IsString()
  metaDescription: string;

  @IsNotEmpty()
  @IsString()
  lang: string;
}

class CreateProductItemsDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  sku: string;

  @IsNotEmpty()
  @IsString()
  prise: number;

  @IsNotEmpty()
  @IsString()
  oldPrise: number;

  @IsNotEmpty()
  @IsString()
  count: number;

  @IsNotEmpty()
  @IsString()
  color: string;

  @IsNotEmpty()
  @IsString()
  img: string;
}

export class CreateProductDto {
  @ApiProperty({ example: 'true', description: 'is lux', required: true })
  @IsNotEmpty()
  @IsBoolean()
  isLux: boolean;

  @ApiProperty({ example: 'text', description: 'img', required: false })
  @IsNotEmpty()
  @IsString()
  img: string;

  @ApiProperty({ example: 'text', description: 'url', required: false })
  @IsNotEmpty()
  @IsString()
  url: string;

  @ApiProperty({
    type: [CreateProductTranslationDto],
    description: 'translations',
    example: [
      {
        title: 'Home',
        subTitle: '/home',
        description: 'en',
        shortDescription: 'en',
        metaTitle: 'en',
        metaKeywords: 'en',
        metaDescription: 'en',
        lang: 'en',
      },
    ],
  })
  @IsOptional()
  translations: CreateProductTranslationDto[];

  @ApiProperty({
    type: [CreateProductItemsDto],
    description: 'items',
    example: [
      {
        name: 'chanel',
        sku: '424r25',
        prise: 140,
        oldPrise: 240,
        count: 4,
        color: 'red',
        img: 'img',
      },
    ],
  })
  @IsOptional()
  items: CreateProductItemsDto[];
}
