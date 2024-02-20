import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ProductLocalization } from './entities/product-localization.entity';
import { Languages } from 'src/languages/languages.enum';
import { CreateProductLocalizationDto } from './dto/create-product-localization.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(ProductLocalization)
    private productLocalizationRepository: Repository<ProductLocalization>,
  ) {}

  // Создаем продукт и добавляем запись в localizations
  async createProduct(dto: CreateProductDto) {
    const product = await this.productRepository.save({
      visited: dto.visited,
      localizations: dto.localizations,
    });
    dto.localizations.forEach(
      async (localizataionDto) =>
        await this.productLocalizationRepository.save(localizataionDto),
    );
    return product;
  }

  // Создаем локализацию к найденому продукту
  async createProductLocalization(dto: CreateProductLocalizationDto) {
    const { id: productId } = dto.product;
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new Error('Product not found');
    }
    const newLocalization = await this.productLocalizationRepository.save({
      name: dto.name,
      language: dto.language,
      product: product,
      subTitle: dto.subTitle,
    });
    return newLocalization;
  }

  // Находим и выводим все продукты и их локализации
  async findAllProducts() {
    const products = await this.productRepository.find({
      relations: ['localizations'],
    });
    return products;
  }

  // Находим и выводим все локализации и продукты, к которым они созданы
  async findAllProductsLocalization(language: Languages) {
    const productsLocalization = await this.productLocalizationRepository.find({
      where: { language },
      relations: ['product'],
    });
    return productsLocalization;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} product`;
  // }

  // update(id: number, updateProductDto: UpdateProductDto) {
  //   return `This action updates a #${id} product`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} product`;
  // }
}

/*
Создание локализации к продукту (http://localhost:3000/api/products/localizations)
{
    "name": "test_name1",
    "language": "ua",
    "product": {
        "id": 1
    },
    "subTitle": "test_subtitle1"
}

Создание продукта и его первой локализации (http://localhost:3000/api/products/)
{
  "visited": 25,
  "localizations": [
    {
      "name": "1Тестовый продукт",
      "language": "ua",
      "subTitle": "1Тестовое описание",
      "product": 11
    }
  ]
}
*/
