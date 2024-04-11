import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ProductTranslationEntity } from './entities/product-translation.entity';
import { ProductItemsEntity } from './entities/product-items.entity';
import { Menu } from '../menu/entities/menu.entity';
import { filterTranslationsByLang } from '../helpers/filterTranslationsByLang';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(ProductTranslationEntity)
    private productTranslationRepository: Repository<ProductTranslationEntity>,
    @InjectRepository(ProductItemsEntity)
    private productItemsRepository: Repository<ProductItemsEntity>,
    //  private readonly jwtService: JwtService,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<any> {
    const { translations, items, ...newData } = createProductDto;

    const newTranslations = await Promise.all(
      translations.map((translationData) =>
        this.productTranslationRepository.create(translationData),
      ),
    );

    const newItems = await Promise.all(
      items.map((itemData) => this.productItemsRepository.create(itemData)),
    );

    const product = this.productRepository.create(newData);

    product.items = newItems;
    product.translations = newTranslations;

    const savedProduct = await this.productRepository.save(product);

    return {
      savedProduct,
    };
  }

  async findAll(
    lang: string,
    page: number,
    limit: number,
    isLux: boolean,
    sortOrder: string,
    sort: string,
  ): Promise<any> {
    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect(
        'product.translations',
        'translation',
        'translation.lang = :lang',
        { lang },
      )
      .leftJoinAndSelect('product.items', 'item')
      .where('product.isLux = :isLux', { isLux })
      .orderBy(`product.${sortOrder}`, sort.toUpperCase() as 'ASC' | 'DESC')
      .take(limit)
      .skip((page - 1) * limit);

    const [data, total] = await queryBuilder.getManyAndCount();

    return {
      data: data,
      total: total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(lang: string, id: string) {
    const product = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect(
        'product.translations',
        'translation',
        'translation.lang = :lang',
        { lang },
      )
      .leftJoinAndSelect('product.items', 'item')
      .where('product.id = :id', { id })
      .getOne();

    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }

    return product;
  }

  async update(lang: string, id: string, updateProductDto: UpdateProductDto) {
    const { translations, items, ...updateData } = updateProductDto;
    await this.productRepository.update(id, updateData);

    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['translations', 'items'],
    });

    if (!product) throw new Error(`Product with ID ${id} not found`);
    if (translations) {
      const findLang = translations.find((t) => t.lang === lang);
      if (findLang) {
        await this.productTranslationRepository.update(
          { product: product, lang: lang },
          findLang,
        );
      }
    }

    if (items && items.length > 0) {
      await this.productItemsRepository.delete({ product: { id: product.id } });
      await Promise.all(
        items.map((itemData) => {
          return this.productItemsRepository.save({
            ...itemData,
            product: product,
          });
        }),
      );
    }

    return this.findOne(lang, id);
  }

  async remove(id: string): Promise<void> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) throw new Error(`Product with ID ${id} not found`);

    await this.productTranslationRepository.delete({ product: { id } });

    await this.productItemsRepository.delete({ product: { id } });

    await this.productRepository.delete(id);
  }
}
