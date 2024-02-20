import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { EntityManager, Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { errorHandler } from 'src/helpers/errorHandler';

function checkRequiredFields(dto, requiredFields: string[]) {
   const missingFields = requiredFields.filter(field => !dto[field]);
   if (missingFields.length > 0) {
      throw new BadRequestException(`Missing required fields: ${missingFields.join(', ')}`);
   }
}

@Injectable()
export class CategoriesService {
   constructor(
      @InjectRepository(Category) private categoryRepository: Repository<Category>,
      private readonly entityManager: EntityManager
   ) {}

   create = errorHandler(async (createCategoryDto: CreateCategoryDto) => {
      const requiredFields = ['title', 'url'];

      // Перевірка обов'язкових полів
      checkRequiredFields(createCategoryDto, requiredFields);

      return await this.categoryRepository.save(createCategoryDto);
   });

   async findAll() {
      const result = await this.entityManager
         .getTreeRepository(Category)
         .findTrees({ relations: ['children'] });
      return result;
      // let result = await this.categoryRepository.find({
      //    relations: ['children.children.children.children.children.children.children', 'parent'],
      // });
      // result = result.filter(item => !item.parent);
      // // console.log(result);

      // return result;
      // return this.categoryRepository
      //    .createQueryBuilder('category')
      //    .leftJoinAndSelect('parent.id', 'parent');
      // return `This action returns all categories`;
   }

   findOne = errorHandler(async (id: number) => {
      const category = await this.categoryRepository.findOne({ where: { id } });
      if (!category) {
         throw new NotFoundException('Category not found');
      }

      const result = await this.entityManager
         .getTreeRepository(Category)
         .findDescendantsTree(category);
      return result;
   });

   async update(id: number, updateCategoryDto: UpdateCategoryDto) {
      const category = await this.categoryRepository.findOne({ where: { id } });
      if (!category) {
         throw new NotFoundException('Category not found');
      }

      return await this.categoryRepository.update(id, updateCategoryDto);
   }

   async remove(id: number) {
      return await this.categoryRepository.delete(id);
   }
}
