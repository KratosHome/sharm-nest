import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryTranslationEntity } from './entities/category-translation.entity';
import { filterTranslationsByLang } from '../helpers/filterTranslationsByLang';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(CategoryTranslationEntity)
    private categoryTranslationRepository: Repository<CategoryTranslationEntity>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const parentCategory = await this.categoryRepository.findOne({
      where: { parent: { id: null } },
    });

    if (parentCategory && !createCategoryDto.parentId) {
      throw new ConflictException('There must be only one parent category');
    }
    const category = this.categoryRepository.create({
      metaImages: createCategoryDto.metaImages,
    });

    if (createCategoryDto.parentId)
      category.parent = await this.categoryRepository.findOneOrFail({
        where: { id: createCategoryDto.parentId },
      });

    const translations = await Promise.all(
      createCategoryDto.translations.map(async (translationData) => {
        const translation = this.categoryTranslationRepository.create({
          ...translationData,
        });
        return await this.categoryTranslationRepository.save(translation);
      }),
    );

    category.translations = translations;

    const savedCategory = await this.categoryRepository.save(category);
    return savedCategory;
  }

  async updateItem(
    lang: string,
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    let category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['translations'],
    });

    if (!category)
      throw new NotFoundException(`Category item with ID ${id} not found`);
    const { translations, ...newData } = updateCategoryDto;
    category = this.categoryRepository.merge(category, newData);

    const translationIndex = category.translations.findIndex(
      (t) => t.lang === lang,
    );

    if (translationIndex === -1) throw new Error('Translation not found');

    const translation = this.categoryTranslationRepository.merge(
      category.translations[translationIndex],
      ...updateCategoryDto.translations,
    );

    await this.categoryTranslationRepository.save(translation);
    await this.categoryRepository.save(category);

    return category;
  }

  async findAll(lang: string): Promise<Category[]> {
    const treeRepository =
      this.categoryRepository.manager.getTreeRepository(Category);
    const categorys: any = await treeRepository.findTrees({
      relations: ['translations', 'children'],
    });

    categorys.forEach((category: Category) =>
      filterTranslationsByLang(category, lang),
    );

    return categorys;
  }

  async findOne(lang: string, id: string): Promise<Category> {
    const treeRepository =
      this.categoryRepository.manager.getTreeRepository(Category);
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['translations', 'children'],
    });
    if (!category) throw new Error('category not found');
    filterTranslationsByLang(category, lang);

    return treeRepository.findDescendantsTree(category);
  }

  async moveItem(nodeId: string, parentId: string) {
    const node = await this.categoryRepository.findOne({
      where: { id: nodeId },
    });
    if (!node) throw new Error('Cannot find node to move');
    const newParent = await this.categoryRepository.findOne({
      where: { id: parentId },
    });
    if (!newParent) throw new Error('Cannot find new parent node');

    node.parent = newParent;

    await this.categoryRepository.save(node);

    return node;
  }

  async remove(id: string): Promise<boolean> {
    const treeRepository =
      this.categoryRepository.manager.getTreeRepository(Category);
    const target = await this.categoryRepository.findOne({ where: { id } });
    if (!target)
      throw new NotFoundException(`Category with ID ${id} not found`);

    const descendants = await treeRepository.findDescendants(target);

    await treeRepository.remove(descendants);

    return true;
  }
}
