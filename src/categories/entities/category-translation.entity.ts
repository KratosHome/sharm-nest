import {
    BaseEntity,
    Column,
    Entity, JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import {Category} from "./category.entity";
import {LangEnum} from "../../enums/lang";

@Entity()
export class CategoryTranslationEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @Column({type: "enum", enum: LangEnum})
    lang: string;

    @Column({unique: true})
    name: string;

    @Column({unique: true})
    description: string;

    @Column({unique: true})
    metaTitle: string;

    @Column()
    metaKeywords: string;

    @Column()
    metaDescription: string;

    @ManyToOne(() => Category, (menu) => menu.translations)
    @JoinColumn({name: 'menuId'})
    category: Category;
}
