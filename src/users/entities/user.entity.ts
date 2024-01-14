import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Order} from "../../orders/entities/order.entity";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true, nullable: true })
    phone: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column()
    role: string;

    @OneToMany(() => Order, (order) => order.user, {onDelete: "NO ACTION"})
    orders: Order[]

}

// visit, order, likes, settings,