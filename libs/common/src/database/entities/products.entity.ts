/* eslint-disable prettier/prettier */
import {
  Entity,
  Column,
  Generated,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { CompaniesEntity } from './companies.entity';

@Entity('products')
export class ProductEntity {
  @Column({ type: 'uuid', length: 60, primary: true, nullable: false })
  @Generated('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  id_erp: string;

  @Column({ nullable: false })
  sku: string;

  @Column({ nullable: true })
  short_description: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true, type: 'text' })
  brand: string;

  @Column({ nullable: true })
  active_web: string;

  @ManyToOne(
    () => CompaniesEntity,
    (CompaniesEntity) => CompaniesEntity.product,
  )
  @JoinTable()
  company: CompaniesEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
