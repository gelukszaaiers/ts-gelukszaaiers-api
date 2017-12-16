import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { usersProviders } from './users.providers';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  modules: [DatabaseModule],
  components: [
    ...usersProviders,
    UsersService,
  ],
})

export class userModule {}
