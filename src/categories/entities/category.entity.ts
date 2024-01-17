import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Menu} from "../../menu/entities/menu.entity";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @Column({unique: true})
    title: string;

    @Column({unique: true})
    url: string;

    @Column({unique: true, nullable: true})
    description: string;

    @OneToMany(() => Menu, menu => menu.category)
    menu: Menu;
}
