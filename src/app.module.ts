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

import { APP_INTERCEPTOR } from '@nestjs/core';
import { IsUniqueInterceptor } from './helpers/interceptors/is-unique-interceptor';

import { NotFoundInterceptor } from './helpers/interceptors/find-one-or-fail.interceptor';
import { EnumInterceptor } from './helpers/interceptors/enum.error.interceptor';
import { typeOrmConfig } from './database/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        typeOrmConfig(configService),
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
