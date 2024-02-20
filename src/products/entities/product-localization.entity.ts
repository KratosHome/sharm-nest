import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
import { Languages } from 'src/languages/languages.enum';

@Entity()
export class ProductLocalization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  subTitle: string;

  @Column({ nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: Languages,
    default: Languages.UKRAINIAN,
  })
  language: Languages;

  @ManyToOne(() => Product, (product) => product.localizations)
  product: Product;
}
