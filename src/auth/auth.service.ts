import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import * as argon2 from "argon2";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(email)
        const passwordIsWatch = await argon2.verify(user.password, password)
        if (user && passwordIsWatch) {
            return user;
        }
        throw new UnauthorizedException("User not found")
    }

    async login(user: any) {
        const {id, email, role} = user;
        return {
            id, email, role, token: this.jwtService.sign({
                id: user.id, email: user.email, role: user.role
            })
        }

    }
}