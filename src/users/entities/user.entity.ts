import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Order} from "../../orders/entities/order.entity";
import {rolesEnum} from "../../enums/roles";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;

    @Column({default: false})
    isDelete: boolean;

    @Column({nullable: true})
    name: string | null;

    @Column({nullable: true})
    surname: string | null;

    @Column({unique: true})
    email: string;

    @Column({default: false})
    isEmailVerified: boolean;

    @Column({unique: true, nullable: true})
    phone: string | null;

    @Column({default: false})
    isPhoneVerified: boolean;

    @Column({unique: true})
    password: string;

    @Column({type: "enum", enum: rolesEnum, default: rolesEnum.user})
    role: string;

    @OneToMany(() => Order, (order) => order.user, {onDelete: "NO ACTION"})
    orders: Order[]

}

