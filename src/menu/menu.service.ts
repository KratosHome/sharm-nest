import {Injectable, NotFoundException} from '@nestjs/common';
import {UpdateMenuDto} from './dto/update-menu.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Menu} from "./entities/menu.entity";
import {Repository} from "typeorm";
import {CreateMenuDto} from "./dto/create-menu.dto";
import {MenuTranslationEntity} from "./entities/menu-translation.entity";
import {filterTranslationsByLang} from "../helpers/filterTranslationsByLang";
import {In} from 'typeorm';

@Injectable()
export class MenuService {
    constructor(
        @InjectRepository(Menu) private menuRepository: Repository<Menu>,
        @InjectRepository(MenuTranslationEntity) private menuTranslationRepository: Repository<MenuTranslationEntity>,
        //  private readonly jwtService: JwtService,
    ) {
    }

    async create(createMenuDto: CreateMenuDto): Promise<Menu> {
        const menu = this.menuRepository.create({
            icons: createMenuDto.icons,
        });

        if (createMenuDto.parentId) menu.parent = await this.menuRepository.findOne({where: {id: createMenuDto.parentId}});

        const savedMenu = await this.menuRepository.save(menu);

        for (const translationData of createMenuDto.translations) {
            const translation = this.menuTranslationRepository.create({
                ...translationData,
                menu: savedMenu
            });
            await this.menuTranslationRepository.save(translation);
        }

        return menu
    }

    async updateItem(lang: string, id: string, updateMenuDto: UpdateMenuDto): Promise<Menu> {
        let menu = await this.menuRepository.findOne({
            where: {id},
            relations: ['translations']
        });

        if (!menu) throw new NotFoundException(`Menu item with ID ${id} not found`);
        const {translations, ...newData} = updateMenuDto;
        menu = this.menuRepository.merge(menu, newData);

        const translationIndex = menu.translations.findIndex(t => t.lang === lang);

        if (translationIndex === -1) throw new Error('Translation not found');

        const translation = this.menuTranslationRepository.merge(menu.translations[translationIndex], ...updateMenuDto.translations);

        await this.menuTranslationRepository.save(translation);
        await this.menuRepository.save(menu);

        return menu;
    }

    async findAll(lang: string): Promise<Menu[]> {
        const treeRepository = this.menuRepository.manager.getTreeRepository(Menu);
        const menus: any = await treeRepository.findTrees();

        menus.forEach((menu: Menu) => filterTranslationsByLang(menu, lang));

        return menus;
    }

    async findOne(lang: string, id: string): Promise<Menu> {
        const treeRepository = this.menuRepository.manager.getTreeRepository(Menu);
        const menu = await this.menuRepository.findOne({where: {id}, relations: ["translations", "children"]});
        if (!menu) throw new Error('Menu not found');
        filterTranslationsByLang(menu, lang);

        return treeRepository.findDescendantsTree(menu);
    }


    async moveItem(nodeId: string, parentId: string) {
        const node = await this.menuRepository.findOne({where: {id: nodeId}});
        if (!node) throw new Error('Cannot find node to move');
        const newParent = await this.menuRepository.findOne({where: {id: parentId}});
        if (!newParent) throw new Error('Cannot find new parent node');

        node.parent = newParent;

        await this.menuRepository.save(node);

        return node;
    }


    async remove(id: string): Promise<boolean> {
        const treeRepository = this.menuRepository.manager.getTreeRepository(Menu);
        const target = await this.menuRepository.findOne({where: {id}});
        if (!target) throw new NotFoundException(`Menu with ID ${id} not found`);

        const descendants = await treeRepository.findDescendants(target);

        await this.menuTranslationRepository.delete({
            menu: In(descendants.map(d => d.id))
        });

        await treeRepository.remove(descendants);

        return true;
    }

}
