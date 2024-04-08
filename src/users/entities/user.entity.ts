import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from '../../orders/entities/order.entity';
import { rolesEnum } from '../../enums/roles';
import { CreateUserDto } from '../dto/create-user.dto';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

  @Column({ default: false })
  isDelete: boolean;

  @Column({ nullable: true })
  name: string | null;

  @Column({ nullable: true })
  surname: string | null;

  @Column({ unique: true })
  email: string;

  @Column({ default: false })
  isEmailVerified: boolean;

  @Column({ unique: true, nullable: true })
  phone: string | null;

  @Column({ default: false })
  isPhoneVerified: boolean;

  @Exclude()
  @Column({ unique: true })
  password: string;

  @Column({ type: 'enum', enum: rolesEnum, default: rolesEnum.user })
  role: string;

  @OneToMany(() => Order, (order) => order.user, { onDelete: 'NO ACTION' })
  orders: Order[];

  constructor(payload?: CreateUserDto) {
    if (!payload) return;
    this.name = payload.name;
    this.surname = payload.surname;
    this.email = payload.email;
    this.phone = payload.phone;
  }
}
