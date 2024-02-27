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
    UseInterceptors, Query
} from '@nestjs/common';
import {ProductsService} from './products.service';
import {CreateProductDto} from './dto/create-product.dto';
import {UpdateProductDto} from './dto/update-product.dto';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ErrorsInterceptor} from "../helpers/ErrorsInterceptor";

@ApiTags('products')
@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService
    ) {
    }

    @Post('')
    @UsePipes(new ValidationPipe())
    @UseInterceptors(ErrorsInterceptor)
    // @SetMetadata('roles', ['admin', 'manager'])
    @ApiOperation({summary: 'create product', description: 'you must create all languages. role: admin, manager'})
    @ApiResponse({status: 200, description: 'Element update', type: CreateProductDto})
    create(@Body() createProductDto: CreateProductDto) {
        return this.productsService.create(createProductDto);
    }


    @Get(":lang")
    @UsePipes(new ValidationPipe())
    @UseInterceptors(ErrorsInterceptor)
    @ApiOperation({
        summary: 'create product',
        description: 'you must create all languages. role: all users, sortOrder: createdAt, saleCount  sort: desc, asc'
    })
    @ApiResponse({status: 200, description: 'Element update', type: CreateProductDto})
    findAll(@Param('lang') lang: string, @Query("page") page: number, @Query("limit") limit: number, @Query("isLux") isLux: boolean, @Query("sortOrder") sortOrder: string, @Query("sort") sort: string) {
        return this.productsService.findAll(lang, page, limit, isLux, sortOrder, sort);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.productsService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
        return this.productsService.update(+id, updateProductDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.productsService.remove(+id);
    }
}
