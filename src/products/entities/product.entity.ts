import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductLocalization } from './product-localization.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  sku: string;

  @Column({ nullable: true })
  prise: number;

  @Column({ nullable: true })
  oldPrise: number;

  @Column({ nullable: true })
  count: number;

  @Column({ nullable: true })
  description: number;

  @Column()
  visited: number;

  @Column({ nullable: true })
  orders: number;

  @OneToMany(
    () => ProductLocalization,
    (productLocalization) => productLocalization.product,
  )
  localizations: ProductLocalization[];
}

// revivers, prudcut vaeiant, характеристики, нещодавно відвідували, з цим товаром купують
