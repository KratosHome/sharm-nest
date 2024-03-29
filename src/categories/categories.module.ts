import {Module} from '@nestjs/common';
import {CategoriesService} from './categories.service';
import {CategoriesController} from './categories.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Category} from "./entities/category.entity";
import {CategoryTranslationEntity} from "./entities/category-translation.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Category, CategoryTranslationEntity])],
    controllers: [CategoriesController],
    providers: [CategoriesService],
})
export class CategoriesModule {
}
