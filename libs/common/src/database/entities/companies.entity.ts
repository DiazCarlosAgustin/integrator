/* eslint-disable prettier/prettier */
import {
  Entity,
  Column,
  Generated,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { UsersEntity } from './users.entity';
import { ServicesEntity } from './services.entity';
import { ProductEntity } from './products.entity';

@Entity('companies')
export class CompaniesEntity {
  @Column({ type: 'uuid', length: 60, primary: true, nullable: false })
  @Generated('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  dbNameConnection: string;

  @OneToMany(() => UsersEntity, (user) => user.company)
  user: UsersEntity[];

  @OneToMany(() => ServicesEntity, (service) => service.company)
  service: ServicesEntity[];

  @OneToMany(() => ProductEntity, (product) => product.company)
  product: ProductEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
