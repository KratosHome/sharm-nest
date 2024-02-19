import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import {
  Languages,
  ProductLocalization,
} from './entities/product-localization.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(ProductLocalization)
    private productLocalizationRepository: Repository<ProductLocalization>,
  ) {}
  async create(dto: CreateProductDto) {
    const { name, subTitle, description, language } = dto;
    const product = await this.productRepository.save({
      subTitle,
      description,
    });
    const productLocalization = await this.productLocalizationRepository.save({
      language,
      name,
      product,
    });
    return productLocalization;
  }

  async findAll(language: Languages) {
    // const products = await this.productRepository.find();
    const productsLocalization = this.productLocalizationRepository.find({
      where: { language },
    });
    return productsLocalization;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
