
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {ConfigService} from "@nestjs/config";
import {ExtractJwt} from "passport-jwt";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET'),
        });
    }

    async validate(user: any) {
        return {id: user.id, email: user.email, role: user.role};
    }
}
