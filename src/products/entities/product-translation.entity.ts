import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Product} from "./product.entity";
import {LangEnum} from "../../enums/lang";

@Entity()
export class ProductTranslationEntity extends BaseEntity {
    @ApiProperty({example: '637800f3-bd8d-42ab-b1ca-15ba9274203e', description: 'ID'})
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({example: 'Chanel Blue de chanel', description: 'product name'})
    @Column({unique: true})
    title: string;

    @ApiProperty({example: 'parfum', description: 'short title'})
    @Column()
    subTitle: string;

    @ApiProperty({example: 'text', description: 'product description'})
    @Column()
    description: string;

    @ApiProperty({example: 'text', description: 'short description'})
    @Column()
    shortDescription: string;

    @ApiProperty({example: 'text', description: 'meta title'})
    @Column()
    metaTitle: string;

    @ApiProperty({example: 'text', description: 'meta keywords'})
    @Column()
    metaKeywords: string;

    @ApiProperty({example: 'text', description: 'meta description'})
    @Column()
    metaDescription: string;

    @ApiProperty({example: 'ua', description: 'language'})
    @Column({type: "enum", enum: LangEnum})
    lang: string;

    @ManyToOne(() => Product, (product) => product.translations)
    product: Product;
}