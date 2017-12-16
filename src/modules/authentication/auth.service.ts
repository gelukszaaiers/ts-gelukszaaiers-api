import * as jwt from 'jsonwebtoken';
import { Component, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../entity/user.entity';

@Component()
export class AuthService {
  constructor(
    @Inject('UserRepositoryToken') private readonly userRepository: Repository<User>
  ) {}

  async createToken(user) {
    const expiresIn = 60 * 60;
    const secretOrKey = 'secret';
    const token = jwt.sign({
      id: user.id,
      langCode: user.langCode,
      email: user.email,
      name: user.name
    }, secretOrKey, { expiresIn });
    return {
      expires_in: expiresIn,
      access_token: token,
    };
  }

  async validateUser(signedUser): Promise<boolean> {
    // put some validation logic here
    // for example query user by id / email / username
    return true;
  }

  async facebook(accessToken, refreshToken, profile) {
    const {
      id: facebookId,
      name: { givenName },
      emails,
      photos: [avatarUrl]
    } = profile;
    const email = "test2@icapps.com";
    const user: User[] = await this.userRepository.find({ email });

    const updatedUser = await this.userRepository.save({
      id: user[0] && user[0].id,
      name: givenName,
      email: email || 'testUser@email.com',
      profilePicture: avatarUrl.value,
      facebook: Object.assign({}, {
        name: profile.name,
        emails: profile.emails,
        photos: profile.photos,
        gender: profile.gender,
        accessToken,
        refreshToken,
      }),
    });

    return await this.createToken(updatedUser);
  }
}
