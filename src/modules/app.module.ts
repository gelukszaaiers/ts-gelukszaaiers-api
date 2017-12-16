import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './authentication/auth.module';
import { userModule } from './user/user.module';

@Module({
  modules: [userModule, AuthModule],
  controllers: [AppController],
  components: [],
})

export class ApplicationModule {}
