import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Seed } from './seed.entity';
import { User } from './user.entity';

@Entity()
export class SeedParticipation extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cancelled: boolean;

  @Column()
  participated: boolean;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @ManyToOne(type => Seed, seed => seed.seedParticipations)
  seed: Seed;

  @ManyToOne(type => User, user => user.seedParticipations)
  user: User;
}
