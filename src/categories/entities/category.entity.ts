import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @Column({unique: true})
    title: string;

    @Column({unique: true})
    url: string;

    @Column({unique: true, nullable: true})
    description: string;
}
