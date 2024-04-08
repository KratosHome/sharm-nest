import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorsInterceptor } from '../helpers/ErrorsInterceptor';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(ErrorsInterceptor)
  // @SetMetadata('roles', ['admin', 'manager'])
  @ApiOperation({
    summary: 'create product',
    description: 'you must create all languages. role: admin, manager',
  })
  @ApiResponse({
    status: 200,
    description: 'Element update',
    type: CreateProductDto,
  })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get(':lang')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(ErrorsInterceptor)
  @ApiOperation({
    summary: 'get all',
    description: `api/products/ua?page=1&limit=10&isLux=false&sort=desc&sortOrder=createdAt . 
                  - **lang**: Language code ( 'ua', 'ru', 'en') to filter products by their translations.
                  - **page**: The page number for pagination (e.g., 1, 2). Determines the set of products to retrieve based on limit.
                  - **limit**: The number of products to return per page (e.g., 10, 20). Helps in dividing the products into manageable sets.
                  - **isLux**: Boolean flag (true or false) to filter products based on their luxury status. 
                  - **sortOrder**: The field by which to sort the products (e.g., 'createdAt', 'price'). Specifies the attribute that should be used for sorting.
                  - **sort**: The direction of the sort (e.g., 'ASC' for ascending, 'DESC' for descending). Determines whether the results should be sorted in ascending or descending order according to the sortOrder.`,
  })
  @ApiResponse({
    status: 200,
    description: 'Element update',
    type: CreateProductDto,
  })
  // @SetMetadata('roles', ['admin', 'manager'])
  findAll(
    @Param('lang') lang: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('isLux') isLux: boolean,
    @Query('sortOrder') sortOrder: string,
    @Query('sort') sort: string,
  ) {
    return this.productsService.findAll(
      lang,
      page,
      limit,
      isLux,
      sortOrder,
      sort,
    );
  }

  @Get(':lang/:id')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(ErrorsInterceptor)
  @ApiOperation({
    summary: 'get one',
    description: 'api/products/ua/bf6f5219-6935-4d77-a74b-04cc7bb7b6d3',
  })
  findOne(@Param('lang') lang: string, @Param('id') id: string) {
    return this.productsService.findOne(lang, id);
  }

  @Patch(':lang/:id')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(ErrorsInterceptor)
  @ApiOperation({
    summary: 'update one',
    description: 'api/products/ua/bf6f5219-6935-4d77-a74b-04cc7bb7b6d3',
  })
  update(
    @Param('lang') lang: string,
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(lang, id, updateProductDto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(ErrorsInterceptor)
  @ApiOperation({
    summary: 'remove one',
    description: 'api/products/bf6f5219-6935-4d77-a74b-04cc7bb7b6d3',
  })
  // @SetMetadata('roles', ['admin', 'manager'])
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
