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
    UseInterceptors
} from '@nestjs/common';
import {MenuService} from './menu.service';
import {CreateMenuDto} from './dto/create-menu.dto';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UpdateMenuDto} from "./dto/update-menu.dto";
import {ErrorsInterceptor} from "../helpers/ErrorsInterceptor";
import {Menu} from "./entities/menu.entity";

@ApiTags('menu')
@Controller('menu')
export class MenuController {
    constructor(private readonly menuService: MenuService) {
    }

    @Post('')
    @UsePipes(new ValidationPipe())
    @UseInterceptors(ErrorsInterceptor)
    // @SetMetadata('roles', ['admin', 'manager'])
    @ApiOperation({summary: 'create menu', description: 'you must create all languages. role: admin, manager'})
    @ApiResponse({status: 200, description: 'Element update', type: CreateMenuDto})
    create(@Body() createMenuDto: CreateMenuDto) {
        return this.menuService.create(createMenuDto);
    }

    @Post(':lang/:id')
    @UseInterceptors(ErrorsInterceptor)
    // @SetMetadata('roles', ['admin', 'manager'])
    @ApiOperation({summary: 'update user', description: 'role: admin, manage'})
    @ApiResponse({status: 200, description: 'Element update', type: UpdateMenuDto})
    update(@Param('lang') lang: string, @Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
        return this.menuService.updateItem(lang, id, updateMenuDto);
    }

    @Get(":lang")
    @UsePipes(new ValidationPipe())
    @UseInterceptors(ErrorsInterceptor)
    @ApiOperation({summary: 'get all menus', description: 'role: all'})
    @ApiResponse({status: 200, description: 'Element update', type: Menu})
    findAll(@Param('lang') lang: string) {
        return this.menuService.findAll(lang);
    }


    @Get(':lang/:id')
    @UsePipes(new ValidationPipe())
    @UseInterceptors(ErrorsInterceptor)
    @ApiOperation({summary: 'get by id', description: 'role: all'})
    @ApiResponse({status: 200, description: 'Element update', type: Menu})
    findOne(@Param('lang') lang: string, @Param('id') id: string) {
        return this.menuService.findOne(lang, id);
    }

    @Patch('move')
    @UsePipes(new ValidationPipe())
    @UseInterceptors(ErrorsInterceptor)
    // @SetMetadata('roles', ['admin', 'manager'])
    @ApiOperation({summary: 'move item tree', description: 'role: admin, manager'})
    @ApiResponse({status: 200, description: 'Element update', type: Menu})
    moveItem(@Body('nodeId') nodeId: string, @Body('parentId') parentId: string) {
        return this.menuService.moveItem(nodeId, parentId);
    }

    @Delete(':id')
    @UsePipes(new ValidationPipe())
    @UseInterceptors(ErrorsInterceptor)
    // @SetMetadata('roles', ['admin', 'manager'])
    @ApiOperation({summary: 'move item tree', description: 'role: admin, manager'})
    @ApiResponse({status: 200, description: 'Element update', type: "true"})
    remove(@Param('id') id: string) {
        return this.menuService.remove(id)
    }
}
