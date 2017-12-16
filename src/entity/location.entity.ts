import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Seed } from "./seed.entity";

@Entity()
export class Location extends BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column("point")
  coords: string|Object;

  @Column()
  address: string;

  @Column()
  postalCode: string;

  @Column()
  city: string;

  @Column()
  country: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @OneToOne(type => Seed)
  @JoinColumn()
  seed: Seed;
}
