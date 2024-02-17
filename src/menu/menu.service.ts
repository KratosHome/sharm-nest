import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {UpdateMenuDto} from './dto/update-menu.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Menu} from "./entities/menu.entity";
import {Repository} from "typeorm";
import {JwtService} from "@nestjs/jwt";
import {CreateMenuDto} from "./dto/create-menu.dto";

@Injectable()
export class MenuService {
    constructor(
        @InjectRepository(Menu) private menuRepository: Repository<Menu>,
        private readonly jwtService: JwtService,
    ) {
    }

    async create(createMenuDto: CreateMenuDto) {
        const menu = this.menuRepository.create({...createMenuDto});

        if (createMenuDto.parentId) {
            menu.parent = await this.menuRepository.findOne({where: {id: createMenuDto.parentId}});
        }

        return await this.menuRepository.save(menu);
    }

    async findAll(page: number, limit: number) {
        const treeRepository = this.menuRepository.manager.getTreeRepository(Menu);
        const menus: any = await treeRepository.findTrees();

        return menus;
    }

    async findOne(id: string) {
        const treeRepository = this.menuRepository.manager.getTreeRepository(Menu);
        const menu = await this.menuRepository.findOne({where: {id}});

        if (!menu) throw new Error('Menu not found');

        const menuWithChildren = await treeRepository.findDescendantsTree(menu);

        return menuWithChildren;
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

    async updateItem(id: string, updateMenuDto: UpdateMenuDto): Promise<Menu> {
        let menu = await this.menuRepository.findOne({where: {id}});
        if (!menu) throw new NotFoundException(`Menu item with ID ${id} not found`);

        menu = this.menuRepository.merge(menu, updateMenuDto);

        await this.menuRepository.save(menu);

        return menu;
    }



    async remove(id: string): Promise<boolean> {
        const treeRepository = this.menuRepository.manager.getTreeRepository(Menu);
        const target = await this.menuRepository.findOne({where: {id}});
        if (!target) throw new NotFoundException(`Menu with ID ${id} not found`);

        const descendants = await treeRepository.findDescendants(target);

        await treeRepository.remove(descendants);

        return true
    }


}
