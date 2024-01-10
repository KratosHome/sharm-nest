import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Order} from "../../orders/entities/order.entities";

enum UserRole {
    ADMIN = "admin",
    MANEGER = "manager",
    CONSULTANT = "consultant",
    USER = "user",
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.USER
    })
    role: string;

    @OneToMany(() => Order, (order) => order.user, {onDelete: "NO ACTION"})
    orders: Order[]

}

// visit, order, likes, settings,