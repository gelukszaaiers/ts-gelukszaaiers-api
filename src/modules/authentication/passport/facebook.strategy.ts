import * as passport from 'passport';
import * as config from 'node-config';
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
      },
      async (accessToken, refreshToken, profile, next) => {
        // await this.verify(req, payload, next)
        // TODO: upsert user in db
      }
    );
    passport.use(this);
  }

  public async verify(req, payload, done) {
    const isValid = await this.authService.validateFacebookToken(payload);
    if (!isValid) {
      return done('Unauthorized', false);
    }
    done(null, payload);
  }
}
