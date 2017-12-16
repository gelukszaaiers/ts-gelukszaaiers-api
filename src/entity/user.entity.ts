import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Like } from "./like.entity";
import { Media } from "./media.entity";
import { Device } from "./device.entity";
import { Seed } from "./seed.entity";
import { SeedParticipation } from "./seedParticipation.entity";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    mobile: string;

    @Column()
    langCode: string;

    @Column()
    profilePicture: string;

    @Column()
    password: string;

    @Column()
    salt: string;

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

    @OneToMany(type => Seed, seed => seed.user)
    seeds: Seed[];

    @OneToMany(type => SeedParticipation, seedParticipation => seedParticipation.user)
    seedParticipations: SeedParticipation[];
}
