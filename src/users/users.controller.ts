import {
    Body,
    Controller,
    Get,
    Param,
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
import {JwtStrategy} from "../auth/strategies/jwt.strategy";
import {RolesGuard} from "../guards/roles.guard";
import {JwtAuthGuard} from "../auth/gurds/jwt-auth.guard";


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
    @UseGuards(JwtAuthGuard, RolesGuard)
    @SetMetadata('roles', ['admin', 'user'])
    findAll(@Query("page") page: number, @Query("limit") limit: number) {
        return this.usersService.findAll(page, limit)
    }


}