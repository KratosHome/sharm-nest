import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn({ name: 'product_id' })
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @Column()
  subTitle: string;

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

  @Column({ nullable: true })
  visited: number;

  @Column({ nullable: true })
  orders: number;
}

// revivers, prudcut vaeiant, характеристики, нещодавно відвідували, з цим товаром купують
