import {BadRequestException, Injectable} from '@nestjs/common';
import {CreateMenuDto} from './dto/create-menu.dto';
import {UpdateMenuDto} from './dto/update-menu.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Menu} from "./entities/menu.entity";
import {Repository} from "typeorm";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class MenuService {

    constructor(
        @InjectRepository(Menu) private menuRepository: Repository<Menu>,
        private readonly jwtService: JwtService,
    ) {
    }

    async create(сreateMenuDto: CreateMenuDto, parentId?: number) {
        let parentMenu = null;

        if (parentId) {
            parentMenu = await this.menuRepository.findOne({where: {id: parentId}});
            if (!parentMenu) {
                throw new BadRequestException("Parent menu not found");
            }
        }

        const menu = this.menuRepository.create({
            ...сreateMenuDto,
            parent: parentMenu
        });

        return await this.menuRepository.save(menu);
    }


    async findAll(page: number, limit: number) {
        const [result, total] = await this.menuRepository.findAndCount({
            relations: ["children", "category"],
            order: {
                createdAt: "DESC",
            },
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
            where: { parentID: id },
            relations: ["children", "category"],
        });

        if (!menu) {
            throw new BadRequestException(`Menu with id ${id} not found`);
        }

        return menu;
    }

    async findSubcategories(categoryId: string) {
        const category = await this.menuRepository.findOne({
            where: { parentID: categoryId },
            relations: ["children"]
        });

        if (!category) {
            throw new BadRequestException(`Category with id ${categoryId} not found`);
        }

        // Повертаємо тільки дочірні категорії
        return category.children;
    }


    async updat2e(id: string, updateMenuDto: UpdateMenuDto): Promise<Menu> {
        const menu = await this.menuRepository.findOne({
            where: { parentID: id },
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
            where: { parentID: id },
            relations: ["children"]
        });
        if (!menu) {
            throw new BadRequestException(`Menu with id ${id} not found`);
        }

        if (newParentId) {
            const newParent = await this.menuRepository.findOne(({
                where: { parentID: newParentId },
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
