import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    UseInterceptors,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {CategoriesService} from './categories.service';
import {CreateCategoryDto} from './dto/create-category.dto';
import {UpdateCategoryDto} from './dto/update-category.dto';
import {JwtAuthGuard} from "../auth/gurds/jwt-auth.guard";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ErrorsInterceptor} from "../helpers/ErrorsInterceptor";
import {Category} from "./entities/category.entity";

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    @UseInterceptors(ErrorsInterceptor)
    @ApiOperation({summary: 'create category', description: 'you must create all languages. role: admin, manager'})
    @ApiResponse({status: 200, description: 'Element update', type: CreateCategoryDto})
    // @SetMetadata('roles', ['admin', 'manager'])
    create(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoriesService.create(createCategoryDto);
    }


    @Post(':lang/:id')
    @UsePipes(new ValidationPipe())
    @UseInterceptors(ErrorsInterceptor)
    // @SetMetadata('roles', ['admin', 'manager'])
    @ApiOperation({summary: 'update categories', description: 'role: admin, manage'})
    @ApiResponse({status: 200, description: 'Element update', type: UpdateCategoryDto})
    update(@Param('lang') lang: string, @Param('id') id: string, @Body() updateMenuDto: UpdateCategoryDto) {
        return this.categoriesService.updateItem(lang, id, updateMenuDto);
    }


    @Get(":lang")
    @UsePipes(new ValidationPipe())
    @UseInterceptors(ErrorsInterceptor)
    @ApiOperation({summary: 'get all categories', description: 'role: all'})
    @ApiResponse({status: 200, description: 'Element update', type: Category})
    findAll(@Param('lang') lang: string) {
        return this.categoriesService.findAll(lang);
    }

    @Get(':lang/:id')
    @UsePipes(new ValidationPipe())
    @UseInterceptors(ErrorsInterceptor)
    @ApiOperation({summary: 'get by id', description: 'role: all'})
    @ApiResponse({status: 200, description: 'Element update', type: Category})
    findOne(@Param('lang') lang: string, @Param('id') id: string) {
        return this.categoriesService.findOne(lang, id);
    }

    @Patch('move')
    @UsePipes(new ValidationPipe())
    @UseInterceptors(ErrorsInterceptor)
    // @SetMetadata('roles', ['admin', 'manager'])
    @ApiOperation({summary: 'move item tree', description: 'role: admin, manager'})
    @ApiResponse({status: 200, description: 'Element update', type: Category})
    moveItem(@Body('nodeId') nodeId: string, @Body('parentId') parentId: string) {
        return this.categoriesService.moveItem(nodeId, parentId);
    }

    @Delete(':id')
    @UsePipes(new ValidationPipe())
    @UseInterceptors(ErrorsInterceptor)
    // @SetMetadata('roles', ['admin', 'manager'])
    @ApiOperation({summary: 'move item tree', description: 'role: admin, manager'})
    @ApiResponse({status: 200, description: 'Element update', type: "true"})
    remove(@Param('id') id: string) {
        return this.categoriesService.remove(id)
    }
}
