import { Order } from 'src/orders/entities/order.entity';
import {
   Column,
   CreateDateColumn,
   Entity,
   OneToMany,
   PrimaryGeneratedColumn,
   UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @Column()
  title: string;

  @Column()
  subTitle: string;

  @Column({ nullable: true })
  sku: string;

  @Column({ default: 0 })
  price: number;

  @Column({ default: 0 })
  oldPrice: number;

  @Column({ default: 0 })
  count: number;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 0 })
  visited: number;

  @OneToMany(() => Order, (order) => order.user)
  //    @JoinColumn({ name: 'user_id' })
  orders: Order[];
}

// revivers, prudcut vaeiant, характеристики, нещодавно відвідували, з цим товаром купують
