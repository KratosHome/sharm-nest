import {
   Column,
   CreateDateColumn,
   Entity,
   PrimaryGeneratedColumn,
   Tree,
   TreeChildren,
   TreeParent,
   UpdateDateColumn,
} from 'typeorm';

@Entity()
@Tree('nested-set')
export class Category {
   @PrimaryGeneratedColumn()
   id: number;

   @Column({ unique: true })
   title: string;

   @Column({ unique: true })
   url: string;

   // @Column({ nullable: true })
   // parent: number;

   // @Column({ unique: true, nullable: true })
   // description: string;

   @CreateDateColumn()
   createdAt: Date;

   @UpdateDateColumn()
   updateAt: Date;

   // @HasMany(() => UnitImage, {
   //    onDelete: 'cascade',
   //    as: 'images',
   // })

   // @OneToMany(() => Category, category => category.parent)
   // children: Category[];
   // @ManyToOne(() => Category, category => category.children)
   // @JoinColumn({ name: 'parent' })
   // parent: Category;

   @TreeChildren()
   children: Category[];
   @TreeParent()
   parent: Category;
}
