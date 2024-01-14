import {Body, Controller, Get, Param, Post, UsePipes, ValidationPipe} from "@nestjs/common";
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Post("")
    @UsePipes(new ValidationPipe())
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto)
    }

    @Get("/")
    findAll() {
        return this.usersService.findAll();
    }

    @Get(":id")
    gerBayId(@Param('id') id: string) {
        return this.usersService.findById(+id);
    }


}