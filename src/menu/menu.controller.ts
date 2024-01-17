import {Controller, Get, Post, Body, Patch, Param, Delete, Req, Query} from '@nestjs/common';
import {MenuService} from './menu.service';
import {CreateMenuDto} from './dto/create-menu.dto';
import {ApiTags} from "@nestjs/swagger";

@ApiTags('menu')
@Controller('menu')
export class MenuController {
    constructor(private readonly menuService: MenuService) {
    }

    @Post()
    create(@Body() createMenuDto: CreateMenuDto) {
        return this.menuService.create(createMenuDto);
    }

    @Get()
    findAll(@Query("page") page: number, @Query("limit") limit: number) {
        return this.menuService.findAll(page, limit);
    }

}
