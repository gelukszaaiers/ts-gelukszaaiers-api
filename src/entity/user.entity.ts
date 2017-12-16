import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Like } from './like.entity';
import { Media } from './media.entity';
import { Device } from './device.entity';
import { Seed } from './seed.entity';
import { SeedParticipation } from './seedParticipation.entity';

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column({ nullable: true })
    mobile: string;

    @Column({ default: 'nl' })
    langCode: string;

    @Column({ nullable: true })
    profilePicture: string;

    @Column({ nullable: true })
    password: string;

    @Column({ nullable: true })
    salt: string;

    @Column({ type: 'jsonb', nullable: true })
    facebook: object;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

    @OneToOne(type => Media)
    @JoinColumn()
    media: Media;

    @OneToMany(type => Like, like => like.user)
    likes: Like[];

    @OneToMany(type => Device, device => device.user)
    devices: Device[];

    @OneToMany(type => Seed, seed => seed.owner)
    seeds: Seed[];

    @OneToMany(type => SeedParticipation, seedParticipation => seedParticipation.user)
    seedParticipations: SeedParticipation[];
}
