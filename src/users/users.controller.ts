import {
    Body,
    Controller, Delete,
    Get, Param,
    Post,
    Query,
    Req,
    SetMetadata,
    UseGuards,
    UsePipes,
    ValidationPipe
} from "@nestjs/common";
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesGuard} from "../guards/roles.guard";
import {JwtAuthGuard} from "../auth/gurds/jwt-auth.guard";
import {UpdateUserDto} from "./dto/update-user.dto";
import {ApiBody, ApiOperation, ApiParam, ApiTags} from "@nestjs/swagger";
import {UpdateRoleUserDto} from "./dto/update-role-user.dto";


@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Post("")
    @UsePipes(new ValidationPipe())
    @ApiOperation({summary: 'create user'})
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto)
    }


    // not tested
    @Get("profile/:id")
    @ApiOperation({summary: 'get user profile = admin can get any user'})
    @ApiParam({name: 'id', description: 'ID of the user'})
    @UsePipes(new ValidationPipe())
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id') id: string, @Req() req: Request) {
        return this.usersService.findById(+id, req)
    }

    @Get("")
    @ApiOperation({summary: 'Get all users: rol: admin'})
    @UsePipes(new ValidationPipe())
    @UseGuards(JwtAuthGuard)
    @SetMetadata('roles', ['admin'])
    findAll(@Query("page") page: number, @Query("limit") limit: number) {
        return this.usersService.findAll(page, limit)
    }

    // not tested
    @Post("update")
    @ApiOperation({summary: 'update user profile = admin can update any user'})
    @ApiBody({type: UpdateUserDto, description: 'Update user by id - front'})
    @UsePipes(new ValidationPipe())
    @UseGuards(JwtAuthGuard)
    updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Req() req: Request) {
        return this.usersService.updateUser(+id, updateUserDto, req)
    }

    @Delete(":id")
    @ApiOperation({summary: 'delete user profile = admin can delete any user'})
    @UsePipes(new ValidationPipe())
    @UseGuards(JwtAuthGuard, RolesGuard)
    @SetMetadata('roles', ['admin'])
    deleteUser(@Param('id') id: string, @Req() req: Request) {
        return this.usersService.deleteUser(+id, req)
    }

    @Post('update-role/:id')
    @UsePipes(new ValidationPipe())
    @UseGuards(JwtAuthGuard, RolesGuard)
    @SetMetadata('roles', ['admin'])
    updateRoleUser(@Param('id') id: string, @Body() updateRoleUserDto: UpdateRoleUserDto, @Req() req: Request) {
        return this.usersService.updateRole(updateRoleUserDto, +id, req)
    }

    @Get('search')
    @ApiOperation({summary: 'Search users by field'})
    @UseGuards(JwtAuthGuard, RolesGuard)
    @SetMetadata('roles', ['admin'])
    async searchUsers(@Query('field') field: string, @Query('value') value: string): Promise<any[]> {
        return this.usersService.searchByField(field, value);
    }


}