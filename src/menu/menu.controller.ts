import {Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, UsePipes, ValidationPipe} from '@nestjs/common';
import {MenuService} from './menu.service';
import {CreateMenuDto} from './dto/create-menu.dto';
import {ApiTags} from "@nestjs/swagger";

@ApiTags('menu')
@Controller('menu')
export class MenuController {
    constructor(private readonly menuService: MenuService) {
    }

    @Post()
    @UsePipes(new ValidationPipe())
    create(@Body() createMenuDto: CreateMenuDto) {
        return this.menuService.create(createMenuDto);
    }

    @Post(':id')
    @UsePipes(new ValidationPipe())
    createWithParentId(@Body() createMenuDto: CreateMenuDto, @Param('id') parentId: string) {
        return this.menuService.create(createMenuDto, parentId);
    }

    @Get()
    @UsePipes(new ValidationPipe())
    findAll(@Query("page") page: number, @Query("limit") limit: number) {
        return this.menuService.findAll(page, limit);
    }

    @Patch('move/:itemId')
    @UsePipes(new ValidationPipe())
    moveItem(@Param('itemId') itemId: string, @Body('targetParentId') targetParentId: string
    ) {
        return this.menuService.moveItem(itemId, targetParentId);
    }

    @Delete(':id')
    @UsePipes(new ValidationPipe())
    remove(@Param('id') id: string) {
        return "this.menuService.remove(id);"
    }

}
