import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersController } from './user/users.controller';
import { userModule } from './user/user.module';

@Module({
  modules: [userModule],
  controllers: [AppController],
  components: [],
})

export class ApplicationModule {}
