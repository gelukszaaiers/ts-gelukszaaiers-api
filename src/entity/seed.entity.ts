import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, JoinColumn, OneToOne, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { RecurringPattern } from './recurringPattern.entity';
import { Like } from './like.entity';
import { SeedParticipation } from './seedParticipation.entity';
import { User } from './user.entity';
import { SeedMedia } from './seedMedia.entity';
import { Location } from './location.entity';

@Entity()
export class Seed extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @OneToOne(type => Location, { eager: true })
  @JoinColumn()
  location: Location;

  @OneToOne(type => RecurringPattern, { eager: true })
  @JoinColumn()
  recurringPattern: RecurringPattern;

  @OneToMany(type => Like, like => like.seed)
  likes: Like[];

  @OneToMany(type => SeedParticipation, seedParticipation => seedParticipation.seed, { eager: true })
  seedParticipations: SeedParticipation[];

  @OneToMany(type => SeedMedia, seedMedia => seedMedia.seed, { eager: true })
  seedMedia: SeedMedia[];

  @ManyToOne(type => User, user => user.seeds)
  owner: User;
}
