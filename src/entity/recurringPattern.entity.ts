import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Seed } from "./seed.entity";

@Entity()
export class RecurringPattern extends BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  start: Date;

  @Column()
  end: Date;

  @Column()
  interval: string;

  @Column()
  numOccurences: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @OneToOne(type => Seed)
  @JoinColumn()
  seed: Seed;
}
