import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  // Param,
  // Delete,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Languages } from 'src/languages/languages.enum';
import { CreateProductLocalizationDto } from './dto/create-product-localization.dto';
// import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  createProduct(@Body() dto: CreateProductDto) {
    return this.productsService.createProduct(dto);
  }

  @Post('localizations')
  createProductLocalization(@Body() dto: CreateProductLocalizationDto) {
    return this.productsService.createProductLocalization(dto);
  }

  @Get()
  findAllProducts() {
    return this.productsService.findAllProducts();
  }

  @Get('localizations')
  findAllProductsLocalization(@Query('language') language: Languages) {
    return this.productsService.findAllProductsLocalization(language);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.productsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productsService.update(+id, updateProductDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productsService.remove(+id);
  // }
}
