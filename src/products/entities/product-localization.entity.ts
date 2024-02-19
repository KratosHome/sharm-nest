import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from './product.entity';

export enum Languages {
  ENGLISH = 'en',
  UKRAINIAN = 'ua',
}

@Entity()
export class ProductLocalization {
  @PrimaryGeneratedColumn({ name: 'product_id' })
  id: number;

  @OneToOne(() => Product)
  @JoinColumn()
  product: Product;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: Languages,
    default: Languages.UKRAINIAN,
  })
  language: Languages;
}
