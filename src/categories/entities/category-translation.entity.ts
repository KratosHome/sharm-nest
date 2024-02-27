import {
    BaseEntity,
    Column,
    Entity, JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import {Category} from "./category.entity";

@Entity()
export class CategoryTranslationEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    lang: string;

    @Column({unique: true})
    name: string;

    @Column({unique: true})
    description: string;

    @Column()
    metaTitle: string;

    @Column()
    metaKeywords: string;

    @Column()
    metaDescription: string;

    @ManyToOne(() => Category, (menu) => menu.translations)
    @JoinColumn({name: 'menuId'})
    category: Category;
}
