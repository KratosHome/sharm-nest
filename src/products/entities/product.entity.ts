import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn({name: "product_id"})
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @Column()
    title: string;

    @Column()
    subTitle: string;

    @Column()
    sku: string;

    @Column()
    prise: number;

    @Column()
    oldPrise: number;

    @Column()
    count: number;

    @Column()
    description: number;

    @Column()
    visited: number;

    @Column()
    orders: number;
}

// revivers, prudcut vaeiant, характеристики, нещодавно відвідували, з цим товаром купують