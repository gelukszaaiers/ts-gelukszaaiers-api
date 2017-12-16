import * as passport from 'passport';
import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './authentication/auth.module';
import { UserModule } from './user/user.module';
import { UsersController } from './user/users.controller';
import { SeedModule } from './seed/seed.module';

@Module({
  modules: [UserModule, AuthModule, SeedModule],
  controllers: [AppController],
  components: [],
})

export class ApplicationModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer) {
    consumer
      .apply(passport.authenticate('jwt', { session: false }))
      .forRoutes(
      { path: '/users', method: RequestMethod.GET },
      { path: '/users/{id}', method: RequestMethod.GET },
      { path: '/users/current', method: RequestMethod.GET },
      { path: '/users/current', method: RequestMethod.PUT },
      { path: '/users/current/verify', method: RequestMethod.POST },
      { path: '/users/current/avatar', method: RequestMethod.POST },
      { path: '/users/current/avatar', method: RequestMethod.DELETE },
      { path: '/seeds', method: RequestMethod.POST },
      { path: '/seeds', method: RequestMethod.PUT },
      { path: '/seeds', method: RequestMethod.DELETE },
    );
  }
}
