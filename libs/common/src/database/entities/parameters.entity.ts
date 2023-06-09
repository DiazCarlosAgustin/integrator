/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { ServiceParametersEntity } from './serviceParameters.entity';
@Entity('parameters')
export class ParametersEntity {
  @Column({ type: 'uuid', length: 60, primary: true, nullable: false })
  @Generated('uuid')
  id: string;

  @Column({ nullable: false })
  @IsString()
  name: string;

  @Column({ nullable: true })
  @IsString()
  value: string;

  @OneToMany(
    () => ServiceParametersEntity,
    (ServiceParameters) => ServiceParameters.parameter,
  )
  service_parameters: ServiceParametersEntity[];
  
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
