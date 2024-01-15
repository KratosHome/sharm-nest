import {Injectable, BadRequestException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";
import {CreateUserDto} from "./dto/create-user.dto";
import * as argon2 from "argon2";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) {
    }

    async create(createUserDto: CreateUserDto) {
        const existUser = await this.userRepository.findOne({where: {email: createUserDto.email}})
        if (existUser) {
            throw new BadRequestException("User already exist")
        }
        const user = await this.userRepository.save({
            email: createUserDto.email,
            password: await argon2.hash(createUserDto.password),
            name: createUserDto.name,
            //   surname: createUserDto.surname,
            phone: createUserDto.phone,
            //      address: createUserDto.address,
            //  city: createUserDto.city,
            role: 'user',
        });

        const token = this.jwtService.sign({id: user.id, email: user.email, role: user.role});

        return {user, token};
    }


    async findOne(email: string): Promise<User | undefined> {
        return await this.userRepository.findOne({where: {email: email}});
    }

   async findAll(page: number, limit: number) {
        const users = await this.userRepository.find({
            order: {
                createdAt: "DESC",
            },
            take: limit,
            skip: (page - 1) * limit,
        });

        const count = await this.userRepository.count();

        return {
            data: users,
            total: count,
            currentPage: page,
            totalPages: Math.ceil(count / limit),
        };
    }



}