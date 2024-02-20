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

    @Post(":lang")
    @UsePipes(new ValidationPipe())
    create(@Param('lang') lang: string, @Body() createMenuDto: CreateMenuDto) {
        return this.menuService.create(lang, createMenuDto);
    }

    @Post(':id')
    update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
        return this.menuService.updateItem(id, updateMenuDto);
    }

    @Get(":lang")
    @UsePipes(new ValidationPipe())
    findAll(@Param('lang') lang: string, @Query("page") page: number, @Query("limit") limit: number) {
        return this.menuService.findAll(lang, page, limit);
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
