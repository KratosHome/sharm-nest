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

    async create(createMenuDto: CreateMenuDto, parentId?: string) {
        const menu = this.menuRepository.create({
            ...createMenuDto,
        });

        if (parentId) {
            const parentMenu = await this.menuRepository.findOne({where: {id: parentId}});
            if (!parentMenu) throw new BadRequestException("Parent menu not found");
            menu.parent = parentMenu;
        }

        return await this.menuRepository.save(menu);
    }


    async findAll(page: number, limit: number) {
        // Функція для рекурсивного побудови відносин
        const buildRelations = (path = 'children', depth = 5) => {
            if (depth === 0) return [];
            const nextPath = `${path}.children`;
            return [path, `${path}.category`, ...buildRelations(nextPath, depth - 1)];
        };

        // Використання рекурсивної функції для створення масиву відносин
        const relations = buildRelations();

        const [result, total] = await this.menuRepository.findAndCount({
            relations: relations,
            order: {createdAt: 'DESC'},
            take: limit,
            skip: (page - 1) * limit,
        });

        return {
            data: result,
            total,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
        };
    }


    async findOne(id: string) {
        const menu = await this.menuRepository.findOne({
            where: {id: id},
            relations: ["children", "category"],
        });

        if (!menu) {
            throw new BadRequestException(`Menu with id ${id} not found`);
        }

        return menu;
    }

    async moveItem(itemId: string, targetParentId?: string) {
        // Знаходження об'єкта, який потрібно перемістити
        const itemToMove = await this.menuRepository.findOne({
            where: {id: itemId},
            relations: ["children", "category"],
        });
        if (!itemToMove) throw new NotFoundException('Item to move not found');

        // Якщо targetParentId надано, знаходимо цільовий батьківський об'єкт
        let targetParent = await this.menuRepository.findOne({
            where: {id: targetParentId},
            relations: ["children", "category"],
        });
        if (!targetParent) throw new NotFoundException('Target parent not found');

        if (targetParentId && itemToMove) {
            await this.menuRepository.remove(itemToMove);
        }

        itemToMove.parent = targetParent;
        return await this.menuRepository.save(itemToMove);
    }


    async findSubcategories(categoryId: string) {
        const category = await this.menuRepository.findOne({
            where: {id: categoryId},
            relations: ["children"]
        });

        if (!category) {
            throw new BadRequestException(`Category with id ${categoryId} not found`);
        }

        // category.children;
        return category;
    }


    async updat2e(id: string, updateMenuDto: UpdateMenuDto): Promise<Menu> {
        const menu = await this.menuRepository.findOne({
            where: {id: id},
            relations: ["children"]
        });
        if (!menu) {
            throw new BadRequestException(`Menu with id ${id} not found`);
        }

        // Оновлення властивостей меню
        Object.assign(menu, updateMenuDto);
        return await this.menuRepository.save(menu);
    }

    async moveMenu(id: string, newParentId: string): Promise<Menu> {
        const menu = await this.menuRepository.findOne({
            where: {id: id},
            relations: ["children"]
        });
        if (!menu) {
            throw new BadRequestException(`Menu with id ${id} not found`);
        }

        if (newParentId) {
            const newParent = await this.menuRepository.findOne(({
                where: {id: newParentId},
            }));
            if (!newParent) {
                throw new BadRequestException(`New parent menu with id ${newParentId} not found`);
            }
            menu.parent = newParent;
        } else {
            menu.parent = null;
        }

        return await this.menuRepository.save(menu);
    }

}
