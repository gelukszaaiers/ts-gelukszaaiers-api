import * as crypto from 'crypto';
import * as uuidV4 from 'uuid/v4';
import { Component, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../entity/user.entity';

@Component()
export class UsersService {
  constructor(
    @Inject('UserRepositoryToken') private readonly userRepository: Repository<User>,
    @Inject('CryptoServiceToken') private readonly CryptoService,
  ) {}

  async create(userData): Promise<User> {
    const { email, firstname, password } = userData;
    const user: User = await this.userRepository.findOne({ email });

    if (user) throw new Error('User already exists');

    const hashedPassword = this.CryptoService.hashString(password);

    const newUser = await this.userRepository.save({
      email,
      name: firstname,
      password: hashedPassword,
    });

    return newUser as User;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findUser(userId): Promise<User> {
    return await this.userRepository.findOneById(userId);
  }
}
