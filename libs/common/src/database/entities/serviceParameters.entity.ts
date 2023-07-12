/* eslint-disable prettier/prettier */
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  JoinTable,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { ParametersEntity } from './parameters.entity';
import { ServicesEntity } from './services.entity';
@Entity('service_parameters')
export class ServiceParametersEntity {
  @Column({ type: 'uuid', length: 60, primary: true, nullable: false })
  @Generated('uuid')
  id: string;

  @Column({ nullable: true })
  value: string;

  @ManyToOne(() => ServicesEntity, (Services) => Services.service_parameters)
  @JoinTable()
  service: ServicesEntity;

  @ManyToOne(
    () => ParametersEntity,
    (Parameters) => Parameters.service_parameters,
  )
  @JoinTable()
  parameter: ParametersEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
