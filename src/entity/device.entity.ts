import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Device extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column({ unique: true })
  identifier: string;

  @Column({ default: false })
  verified: boolean;

  @Column({ nullable: true })
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
