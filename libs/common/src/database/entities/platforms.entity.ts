/* eslint-disable prettier/prettier */
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { ServicesEntity } from './services.entity';
@Entity('platforms')
export class PlatformsEntity {
  @Column({ type: 'uuid', length: 60, primary: true, nullable: false })
  @Generated('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  note: string;

  @OneToMany(() => ServicesEntity, (service) => service.origin_platform)
  origin_platform: ServicesEntity[];

  @OneToMany(() => ServicesEntity, (service) => service.destination_platform)
  destination_platform: ServicesEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
