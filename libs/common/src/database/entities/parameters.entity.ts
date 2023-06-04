/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  UpdateDateColumn,
} from 'typeorm';
@Entity('parameters')
export class ParametersEntity {
  @Column({ type: 'uuid', length: 60, primary: true , nullable: false})
  @Generated('uuid')
  id: string;

  @Column({ nullable: false })
  @IsString()
  name: string;

  @Column({ nullable: true })
  @IsString()
  value: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
