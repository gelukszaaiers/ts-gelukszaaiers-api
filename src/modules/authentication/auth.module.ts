import * as passport from 'passport';
import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './passport/jwt.strategy';
import { FacebookStrategy } from './passport/facebook.strategy';
import { AuthController } from './auth.controller';
import { authProviders } from './auth.providers';

@Module({
  components: [AuthService, JwtStrategy, FacebookStrategy, ...authProviders],
  controllers: [AuthController],
  modules: [DatabaseModule],
})

export class AuthModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer) {
    consumer
      .apply(passport.authenticate('facebook-token', { session: false }))
      .forRoutes({ path: '/auth/facebook', method: RequestMethod.POST });
  }
}
