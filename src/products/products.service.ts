import {Injectable} from '@nestjs/common';
import {CreateProductDto} from './dto/create-product.dto';
import {UpdateProductDto} from './dto/update-product.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Product} from "./entities/product.entity";
import {Repository} from "typeorm";
import {ProductTranslationEntity} from "./entities/product-translation.entity";
import {ProductItemsEntity} from "./entities/product-items.entity";
import {Menu} from "../menu/entities/menu.entity";
import {filterTranslationsByLang} from "../helpers/filterTranslationsByLang";

@Injectable()
export class ProductsService {

    constructor(
        @InjectRepository(Product) private productRepository: Repository<Product>,
        @InjectRepository(ProductTranslationEntity) private productTranslationRepository: Repository<ProductTranslationEntity>,
        @InjectRepository(ProductItemsEntity) private productItemsRepository: Repository<ProductItemsEntity>,
        //  private readonly jwtService: JwtService,
    ) {
    }

    async create(createProductDto: CreateProductDto): Promise<any> {
        const {translations, items, ...newData} = createProductDto;
        const product = this.productRepository.create(newData);
        const savedProduct = await this.productRepository.save(product);

        for (const translationData of translations) {
            const translation = this.productTranslationRepository.create({
                ...translationData,
                product: savedProduct
            });
            await this.productTranslationRepository.save(translation);
        }


        for (const itemData of items) {
            const item = this.productItemsRepository.create({
                ...itemData,
                product: savedProduct
            });
            await this.productItemsRepository.save(item);
        }

        return {
            ...product,
            items: items,
            translations: translations
        }
    }

    async findAll(lang: string, page: number, limit: number, isLux: boolean, sortOrder: string, sort: string): Promise<any> {

        const queryBuilder = this.productRepository.createQueryBuilder('product')
            .leftJoinAndSelect('product.translations', 'translation', 'translation.lang = :lang', {lang})
            .leftJoinAndSelect('product.items', 'item')
            .where('product.isLux = :isLux', {isLux})
            .orderBy(`product.${sortOrder}`, sort.toUpperCase() as "ASC" | "DESC")
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
