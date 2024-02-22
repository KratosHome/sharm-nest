import {
    BaseEntity,
    Column,
    Entity, JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    Tree,
} from "typeorm";
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
    lang: string;

    @ManyToOne(() => Menu, (menu) => menu.translations)
    @JoinColumn({ name: 'menuId' })
    menu: Menu;
}
