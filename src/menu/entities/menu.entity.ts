import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { MenuTranslationEntity } from './menu-translation.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@Tree('nested-set')
export class Menu extends BaseEntity {
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
  icons: string;

  @ApiProperty({
    type: () => Menu,
    isArray: true,
    description: 'Additional menu items',
  })
  @TreeChildren()
  children: Menu[];

  @ApiProperty({ type: () => Menu, description: 'Parent menu items' })
  @TreeParent()
  parent: Menu;

  @ApiProperty({
    type: () => MenuTranslationEntity,
    isArray: true,
    description: 'Translate menu',
  })
  @OneToMany(() => MenuTranslationEntity, (translation) => translation.menu, {
    cascade: true,
  })
  translations: MenuTranslationEntity[];
}
