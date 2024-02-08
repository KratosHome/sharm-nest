import {Injectable, BadRequestException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";
import {CreateUserDto} from "./dto/create-user.dto";
import * as argon2 from "argon2";
import {JwtService} from "@nestjs/jwt";
import {UpdateUserDto} from "./dto/update-user.dto";
import {UpdateRoleUserDto} from "./dto/update-role-user.dto";

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) {
    }

    async create(createUserDto: CreateUserDto) {
        const existUser = await this.userRepository.findOne({where: {email: createUserDto.email}})
        if (existUser) throw new BadRequestException("User already exist")

        const user = await this.userRepository.save({
            name: createUserDto.name,
            surname: createUserDto.surname,
            email: createUserDto.email,
            phone: createUserDto.phone,
            password: await argon2.hash(createUserDto.password),
            role: 'user',
        });

        const token = this.jwtService.sign({id: user.id, email: user.email, role: user.role});
        user.password = undefined;

        return {user, token};
    }

    async findOne(email: string): Promise<User | undefined> {
        return await this.userRepository.findOne({where: {email: email}});
    }

    async findById(id: number, req: any): Promise<User | undefined> {
        const userToBeDeletedId = req.user.role === "admin" ? id : req.user.id;
        const updatedUser = await this.userRepository.findOne({where: {id: userToBeDeletedId}});
        return updatedUser;
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

        const usersWithoutPassword = users.map(user => {
            const {password, ...userWithoutPassword} = user;
            return userWithoutPassword;
        });

        return {
            data: usersWithoutPassword,
            total: count,
            currentPage: page,
            totalPages: Math.ceil(count / limit),
        };
    }

    async updateUser(userId: number, updateUserDto: UpdateUserDto, req: any): Promise<User> {
        const userToBeDeletedId = req.user.role === "admin" ? userId : req.user.id;
        const updatedUser = await this.userRepository.findOne({where: {id: userToBeDeletedId}});

        if (!updatedUser) throw new BadRequestException("User not found")

        await this.userRepository.update(userId, updateUserDto);

        return updatedUser;
    }


    async deleteUser(userId: number, req: any): Promise<User | boolean> {
      //  const userToBeDeletedId = req.user.role === "admin" ? userId : req.user.id;
        const user = await this.userRepository.findOne({where: {id: userId}});

        if (!user) throw new BadRequestException("User not found")

        await this.userRepository.delete(userId);

        return true
    }

    async updateRole(updateRoleUserDto: UpdateRoleUserDto, userId: number, req: any): Promise<User | boolean> {
        const userToBeDeletedId = req.user.role === "admin" ? userId : null;
        const user = await this.userRepository.findOne({where: {id: userToBeDeletedId}});

        if (!user) throw new BadRequestException("User not found")

        await this.userRepository.save(updateRoleUserDto);

        return user
    }
}

/*
    async deleteUser(userId: number, req: any): Promise<User | boolean> {
        const userToBeDeletedId = req.user.role === "admin" ? userId : req.user.id;
        const user = await this.userRepository.findOne({where: {id: userToBeDeletedId}});

        if (!user) throw new BadRequestException("User not found")

        user.isDelete = true;
        user.deleteAt = new Date()

        await this.userRepository.save(user);

        return user
    }
 */