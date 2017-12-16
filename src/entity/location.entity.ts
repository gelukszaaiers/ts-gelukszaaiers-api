import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Seed } from './seed.entity';

@Entity()
export class Location extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('simple-array')
  coords: number[];

  @Column()
  address: string;

  @Column()
  postalCode: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @OneToOne(type => Seed)
  @JoinColumn()
  seed: Seed;
}
