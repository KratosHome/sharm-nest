import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import {Order} from "./order.entities";
import {Product} from "../../products/entities/products.sntities";

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Order, order => order.orderItems)
    order: Order;

    @ManyToOne(() => Product)
    product: Product;

    @Column()
    count: number;
}
