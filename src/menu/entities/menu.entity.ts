import {
    BeforeInsert,
    Column,
    CreateDateColumn, DeleteDateColumn,
    Entity, Generated,
    JoinColumn,
    ManyToOne,
    OneToMany, OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Category} from "../../categories/entities/category.entity";

@Entity()
export class Menu {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;

    @Column({type: 'uuid', nullable: true, unique: true})
    @Generated('uuid')
    parentID: string | null;

    @Column({unique: true})
    title: string;

    @Column({unique: true})
    url: string;

    @Column()
    icons: string;

    @ManyToOne(() => Menu, menu => menu.children)
    parent: Menu;

    @OneToMany(() => Menu, menu => menu.parent)
    children: Menu[];

    @OneToOne(() => Category, category => category.menu)
    @JoinColumn()
    category: Category;

}
