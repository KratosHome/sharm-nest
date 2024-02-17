import {Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, UsePipes, ValidationPipe} from '@nestjs/common';
import {MenuService} from './menu.service';
import {CreateMenuDto} from './dto/create-menu.dto';
import {ApiTags} from "@nestjs/swagger";
import {UpdateMenuDto} from "./dto/update-menu.dto";

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
    update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
        return this.menuService.updateItem(id, updateMenuDto);
    }

    @Get()
    @UsePipes(new ValidationPipe())
    findAll(@Query("page") page: number, @Query("limit") limit: number) {
        return this.menuService.findAll(page, limit);
    }


    @Get(':id')
    @UsePipes(new ValidationPipe())
    findOne(@Param('id') id: string) {
        return this.menuService.findOne(id);
    }

    @Patch('move')
    @UsePipes(new ValidationPipe())
    moveItem(
        @Body('nodeId') nodeId: string,
        @Body('parentId') parentId: string
    ) {
        return this.menuService.moveItem(nodeId, parentId);
    }


    @Delete(':id')
    @UsePipes(new ValidationPipe())
    remove(@Param('id') id: string) {
        return this.menuService.remove(id)
    }


}
