import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from '../auth/gurds/jwt-auth.guard';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReturnedCategoryDto } from './dto/returned-category.dto';
import { GetReturnedCategoryDto } from './dto/get-returned-category.dto';

@ApiTags('category')
@Controller('categories')
export class CategoriesController {
   constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'post category by id' })
  @ApiParam({ name: 'id', required: true, description: 'category identifier' })
  @ApiBody({ type: CreateCategoryDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: ReturnedCategoryDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'get all categories' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: [GetReturnedCategoryDto],
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'get category by id' })
  @ApiParam({ name: 'id', required: true, description: 'category identifier' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: GetReturnedCategoryDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'patch category by id' })
  @ApiParam({ name: 'id', required: true, description: 'category identifier' })
  @ApiBody({ type: CreateCategoryDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: ReturnedCategoryDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  update(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'delete category by id' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
