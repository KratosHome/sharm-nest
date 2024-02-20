import {
    BaseEntity,
    BeforeInsert,
    Column,
    CreateDateColumn, DeleteDateColumn,
    Entity, Generated,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    Tree,
    TreeChildren,
    TreeParent,
    UpdateDateColumn
} from "typeorm";
import {Category} from "../../categories/entities/category.entity";
import {Menu} from "./menu.entity";

@Entity()
@Tree("nested-set")
export class MenuTranslationEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    name: string;

    @Column({unique: true})
    url: string;

    @Column()
    icons: string;

    @Column()
    lang: string;

    @ManyToOne(() => Menu, (menu) => menu.translations)
    menu: Menu;
}
