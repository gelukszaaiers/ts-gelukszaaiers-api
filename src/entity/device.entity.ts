import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Device extends BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  userId: string;

  @Column()
  identifier: string;

  @Column()
  verified: boolean;

  @Column()
  verificationCode: number;

  @Column()
  refreshToken: string;

  @Column()
  refreshTokenExpires: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @ManyToOne(type => User, user => user.devices)
  user: User;
}
