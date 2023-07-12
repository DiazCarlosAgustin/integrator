/* eslint-disable prettier/prettier */
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  JoinTable,
  ManyToOne,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { CompaniesEntity } from './companies.entity';
import { PlatformsEntity } from './platforms.entity';
import { ServiceParametersEntity } from './serviceParameters.entity';
@Entity('services')
export class ServicesEntity {
  @Column({ type: 'uuid', length: 60, primary: true, nullable: false })
  @Generated('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @ManyToOne(() => CompaniesEntity, (Companies) => Companies.service)
  @JoinTable()
  company: CompaniesEntity;

  @ManyToOne(() => PlatformsEntity, (Platforms) => Platforms.origin_platform)
  @JoinTable()
  origin_platform: PlatformsEntity;

  @ManyToOne(
    () => PlatformsEntity,
    (Platforms) => Platforms.destination_platform,
  )
  @JoinTable()
  destination_platform: CompaniesEntity;

  @OneToMany(
    () => ServiceParametersEntity,
    (ServiceParameter) => ServiceParameter.service,
  )
  service_parameters: ServiceParametersEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
