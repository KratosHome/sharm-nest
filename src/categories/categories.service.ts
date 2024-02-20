import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { EntityManager, Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { errorHandler } from 'src/helpers/errorHandler';

// function checkRequiredFields(dto, requiredFields: string[]) {
//    const missingFields = requiredFields.filter(field => !dto[field]);
//    if (missingFields.length > 0) {
//       throw new BadRequestException(`Missing required fields: ${missingFields.join(', ')}`);
//    }
// }

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private readonly entityManager: EntityManager,
  ) {}

  create = errorHandler(async (createCategoryDto: CreateCategoryDto) => {
    // const requiredFields = ['title', 'url'];
    // // Перевірка обов'язкових полів
    // checkRequiredFields(createCategoryDto, requiredFields);
    const category = this.categoryRepository.create(createCategoryDto);

    if (createCategoryDto.parentId) {
      category.parent = await this.categoryRepository.findOne({
        where: { id: createCategoryDto.parentId },
      });
    }

    return await this.categoryRepository.save(category);
  });

  findAll = errorHandler(async () => {
    const result = await this.entityManager
      .getTreeRepository(Category)
      .findTrees();
    return result;
  });

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
    console.log('id = ', id);
    const node = await this.categoryRepository.findOne({
      where: { id },
    });
    if (!node)
      throw new NotFoundException('Cannot find category to move or update');

    console.log('node = ', node);
    const category = this.categoryRepository.create(updateCategoryDto);

    if (updateCategoryDto.parentId) {
      const parent = await this.categoryRepository.findOne({
        where: { id: updateCategoryDto.parentId },
      });
      if (!parent)
        throw new NotFoundException(
          `Cannot find category with parentId ${updateCategoryDto.parentId}`,
        );
      category.parent = parent;
    }

    return await this.categoryRepository.update(id, category);
  }

  remove = errorHandler(async (id: number) => {
    const target = await this.categoryRepository.findOne({ where: { id } });
    if (!target)
      throw new NotFoundException(`Category with ID ${id} not found`);

    return await this.categoryRepository.delete(id);
  });
}
