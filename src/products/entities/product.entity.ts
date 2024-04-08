import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ProductTranslationEntity } from './product-translation.entity';
import { ProductItemsEntity } from './product-items.entity';

@Entity()
export class Product {
  @ApiProperty({
    example: '637800f3-bd8d-42ab-b1ca-15ba9274203e',
    description: 'ID',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: '2024-02-23T04:39:58.538Z',
    description: 'Date update',
    type: 'string',
    format: 'date-time',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    example: '2024-02-23T04:39:58.538Z',
    description: 'Date update',
    type: 'string',
    format: 'date-time',
  })
  @UpdateDateColumn()
  updateAt: Date;

  @ApiProperty({ example: 'true', description: 'is lux product' })
  @Column()
  isLux: boolean;

  @ApiProperty({ example: 'string', description: 'img' })
  @Column()
  img: string;

  @ApiProperty({ example: '42', description: 'visit count' })
  @Column({ default: 0 })
  visited: number;

  @ApiProperty({ example: '14', description: 'sale count' })
  @Column({ default: 0 })
  saleCount: number;

  @ApiProperty({ example: '14', description: 'url' })
  @Column({ unique: true })
  url: string;

  @OneToMany(
    () => ProductTranslationEntity,
    (translation) => translation.product,
    { cascade: true },
  )
  translations: ProductTranslationEntity[];

  @OneToMany(() => ProductItemsEntity, (translation) => translation.product, {
    cascade: true,
  })
  items: ProductItemsEntity[];
}
