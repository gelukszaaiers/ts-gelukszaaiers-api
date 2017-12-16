import * as passport from 'passport';
import * as config from 'config';
import * as FacebookTokenStrategy from 'passport-facebook-token';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Component, Inject } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Component()
export class FacebookStrategy extends FacebookTokenStrategy {
  constructor(private readonly authService: AuthService) {
    super(
      {
        clientID: config.get('facebook.clientId'),
        clientSecret: config.get('facebook.clientSecret'),
        passReqToCallback: true,
      },
      async (req, accessToken, refreshToken, profile, done) => {
        const tokens = await this.authService.facebook(accessToken, refreshToken, profile);
        return done(null, tokens);
      }
    );
    passport.use(this);
  }
}
