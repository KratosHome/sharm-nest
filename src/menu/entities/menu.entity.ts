import {
    BaseEntity,
    BeforeInsert,
    Column,
    CreateDateColumn, DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany, OneToOne,
    PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent,
    UpdateDateColumn
} from "typeorm";
import {Category} from "../../categories/entities/category.entity";
import {MenuTranslationEntity} from "./menu-translation.entity";


@Entity()
@Tree("nested-set")
export class Menu extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;

    @Column({ unique: true, nullable: true }) // test
    name: string | null;

    @Column({unique: true})
    url: string;

    @Column()
    icons: string;

    @TreeChildren()
    children: Menu[];

    @TreeParent()
    parent: Menu

    @OneToOne(() => Category, category => category.menu)
    @JoinColumn()
    category: Category;

    @OneToMany(() => MenuTranslationEntity, (translation) => translation.menu)
    translations: MenuTranslationEntity;
}
