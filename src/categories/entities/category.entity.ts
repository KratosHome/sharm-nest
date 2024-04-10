import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
  UpdateDateColumn,
} from 'typeorm';
import { Menu } from '../../menu/entities/menu.entity';
import { ApiProperty } from '@nestjs/swagger';
import { CategoryTranslationEntity } from './category-translation.entity';

@Entity()
@Tree('nested-set')
export class Category extends BaseEntity {
  @ApiProperty({
    example: '637800f3-bd8d-42ab-b1ca-15ba9274203e',
    description: 'ID',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: '2024-02-23T04:39:58.538Z',
    description: 'Date create',
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

  @ApiProperty({
    example: null,
    description: 'Date delete ',
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  @DeleteDateColumn()
  deleteAt: Date;

  @ApiProperty({ example: '1', description: 'icon img' })
  @Column()
  metaImages: string;

  @ApiProperty({
    type: () => Category,
    isArray: true,
    description: 'Additional menu items',
  })
  @TreeChildren()
  children: Category[];

  @ApiProperty({ type: () => Category, description: 'Parent menu items' })
  @TreeParent()
  parent: Category;

  @ApiProperty({
    type: () => CategoryTranslationEntity,
    isArray: true,
    description: 'Translate menu',
  })
  @OneToMany(
    () => CategoryTranslationEntity,
    (translation) => translation.category,
    { cascade: true },
  )
  translations: CategoryTranslationEntity[];
}
