import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { MenuModule } from './menu/menu.module';

import * as fs from 'fs';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { IsUniqueInterceptor } from './helpers/interceptors/is-unique-interceptor';

import { NotFoundInterceptor } from './helpers/interceptors/find-one-or-fail.interceptor';
import { EnumInterceptor } from './helpers/interceptors/enum.error.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        // ssl: {
        //   rejectUnauthorized: false,
        //   ca: fs.readFileSync('./eu-west-2-bundle.p7b').toString(),
        // },
      }),
      inject: [ConfigService],
    }),
    TaskModule,
    UsersModule,
    AuthModule,
    CategoriesModule,
    ProductsModule,
    MenuModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: IsUniqueInterceptor },
    { provide: APP_INTERCEPTOR, useClass: EnumInterceptor },
    { provide: APP_INTERCEPTOR, useClass: NotFoundInterceptor },
  ],
})
export class AppModule {}
