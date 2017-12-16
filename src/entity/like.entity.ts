import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Seed } from "./seed.entity";
import { User } from "./user.entity";

@Entity()
export class Like extends BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  id: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @ManyToOne(type => Seed, seed => seed.likes)
  seed: Seed;

  @ManyToOne(type => User, user => user.likes)
  user: User;
}
