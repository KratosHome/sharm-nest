import {
    BaseEntity,
    Column,
    Entity, JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import {Menu} from "./menu.entity";
import {ApiProperty} from "@nestjs/swagger";
import {LangEnum} from "../../enums/lang";

@Entity()
export class MenuTranslationEntity extends BaseEntity {
    @ApiProperty({example: '637800f3-bd8d-42ab-b1ca-15ba9274203e', description: 'ID'})
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({example: 'cosmetic', description: 'name menu'})
    @Column({unique: true})
    name: string;

    @ApiProperty({example: 'string', description: 'url'})
    @Column({unique: true})
    url: string;

    @ApiProperty({example: 'ua', description: 'language'})
    @Column({type: "enum", enum: LangEnum})
    lang: string;

    @ManyToOne(() => Menu, (menu) => menu.translations)
    @JoinColumn({name: 'menuId'})
    menu: Menu;
}
