import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from './product.entity';

@Entity()
export class ProductItemsEntity extends BaseEntity {
  @ApiProperty({
    example: '637800f3-bd8d-42ab-b1ca-15ba9274203e',
    description: 'ID',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: '50мл', description: 'volume, weight, color' })
  @Column()
  name: string;

  @ApiProperty({ example: '452452', description: 'unique product sku code' })
  @Column({ unique: true })
  sku: string;

  @ApiProperty({ example: '150', description: 'product prise' })
  @Column()
  prise: number;

  @ApiProperty({ example: '150', description: 'old prise' })
  @Column()
  oldPrise: number;

  @ApiProperty({ example: '42', description: 'remaining stock' })
  @Column()
  count: number;

  @ApiProperty({ example: '#535653', description: 'RGB' })
  @Column()
  color: string;

  @ApiProperty({ example: 'string', description: 'color img' })
  @Column()
  img: string;

  @ManyToOne(() => Product, (product) => product.items, {
    onDelete: 'CASCADE',
  })
  product: Product;
}
