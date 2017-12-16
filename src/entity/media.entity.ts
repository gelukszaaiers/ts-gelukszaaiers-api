import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { SeedMedia } from "./seedMedia.entity";
import { User } from "./user.entity";

@Entity()
export class Media extends BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  name: string;

  @Column()
  key: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @OneToMany(type => SeedMedia, seedMedia => seedMedia.media)
  seedMedia: SeedMedia;

  @OneToOne(type => User)
  @JoinColumn()
  user: User;
}
