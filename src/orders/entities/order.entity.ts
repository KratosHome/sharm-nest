import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {User} from "../../users/entities/user.entity";
import {OrderItem} from "./orderItem.entity";

@Entity()
export class Order {
    @PrimaryGeneratedColumn({name: "order_id"})
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @ManyToOne(() => User, (user) => user.orders, {onDelete: "NO ACTION"})
    @JoinColumn({name: "user_id"})
    user: User;

    @Column()
    status: string;

    @OneToMany(() => OrderItem, orderItem => orderItem.order)
    orderItems: OrderItem[];
}

