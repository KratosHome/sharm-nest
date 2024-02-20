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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'sharm_db_first',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        autoLoadEntities: true,
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
  providers: [AppService],
})
export class AppModule {}
