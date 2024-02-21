import {Module} from '@nestjs/common';
import {MenuService} from './menu.service';
import {MenuController} from './menu.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Menu} from "./entities/menu.entity";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {MenuTranslationEntity} from "./entities/menu-translation.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Menu, MenuTranslationEntity]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: {expiresIn: '60d'},
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [MenuController],
    providers: [MenuService],
})
export class MenuModule {
}
// fvdfvsf а ца