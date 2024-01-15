import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateCategoryDto} from './dto/create-category.dto';
import {UpdateCategoryDto} from './dto/update-category.dto';
import {Repository} from "typeorm";
import {Category} from "./entities/category.entity";
import {InjectRepository} from "@nestjs/typeorm";

function checkRequiredFields(dto, requiredFields) {
    const missingFields = requiredFields.filter(field => !dto[field]);
    if (missingFields.length > 0) {
        throw new BadRequestException(`Missing required fields: ${missingFields.join(', ')}`);
    }
}

@Injectable()
export class CategoriesService {

    constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) {
    }

    async create(createCategoryDto: CreateCategoryDto) {
        const isExistTitle = await this.categoryRepository.findBy({title: createCategoryDto.title});
        const isExistUrl = await this.categoryRepository.findBy({url: createCategoryDto.url});
        const requiredFields = ['title', 'url'];

        // Перевірка обов'язкових полів
        checkRequiredFields(createCategoryDto, requiredFields);
        if (isExistTitle.length > 0) {
            throw new BadRequestException('Category already exist');
        }
        if (isExistUrl.length > 0) {
            throw new BadRequestException('url already exist');
        }

        const category = {
            title: createCategoryDto.title,
            url: createCategoryDto.url,
            description: createCategoryDto.description,
        }

        return await this.categoryRepository.save(category);
    }

    findAll() {
        return `This action returns all categories`;
    }

    async findOne(id: number) {
        const isExist = await this.categoryRepository.findOne({where: {id}});
        if (!isExist) {
            throw new NotFoundException('Category not found');
        }

        return {isExist};
    }

    async update(id: number, updateCategoryDto: UpdateCategoryDto) {
        const category = await this.categoryRepository.findOne({where: {id}});
        if (!category) {
            throw new NotFoundException('Category not found');
        }

        return await this.categoryRepository.update(id, updateCategoryDto);
    }

    async remove(id: number) {
        const category = await this.categoryRepository.findOne({where: {id}});
        if (!category) {throw new NotFoundException('Category not found');}

        return await this.categoryRepository.delete(id);
    }
}
