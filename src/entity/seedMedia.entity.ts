import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Media } from "./media.entity";
import { Seed } from "./seed.entity";

@Entity()
export class SeedMedia extends BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  featured: boolean;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @ManyToOne(type => Media, media => media.seedMedia)
  media: Media;

  @ManyToOne(type => Seed, seed => seed.seedMedia)
  seed: Seed;

}
