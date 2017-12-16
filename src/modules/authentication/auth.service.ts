import * as crypto from "crypto";
import * as uuidV4 from "uuid/v4";
import * as config from "config";
import { DateTime } from "luxon";
import * as jwt from "jsonwebtoken";
import { Component, Inject, HttpStatus, HttpException } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../../entity/user.entity";
import { Device } from "../../entity/device.entity";
import { UnauthorizedException } from '../exceptions';

@Component()
export class AuthService {
  private readonly algorithm: string

  constructor(
    @Inject("UserRepositoryToken") private readonly userRepository: Repository<User>,
    @Inject("DeviceRepositoryToken") private readonly deviceRepository: Repository<Device>,
    @Inject("CryptoServiceToken") private readonly cryptoService
  ) {}

  private async createTokens(user) {
    const expiresIn = 60 * 60;
    const secretOrKey = "secret";
    const refreshToken = await this.cryptoService.hashString();
    const accessToken = this.cryptoService.signJwt({
      id: user.id,
      langCode: user.langCode,
      email: user.email,
      name: user.name
    })

    return { expires_in: expiresIn, accessToken, refreshToken };
  }

  private async updateDeviceForUser(userId, identifier, tokens) {
    const device = await this.deviceRepository.findOne({ identifier });
    const refreshTokenExpires = DateTime.utc()
      .plus({ days: config.get("authentication.refreshTokenExpirationDays") })
      .toISO();

    return await this.deviceRepository.save({
      id: device && device.id,
      identifier,
      refreshToken: tokens.refreshToken,
      refreshTokenExpires,
      userId,
    });
  }

  async refresh({ identifier, refreshToken }) {
    const refreshValid = config.get("authentication.refreshTokenExpirationDays");
    const device = await this.deviceRepository.findOne({ identifier, refreshToken });

    if (!device) throw new Error('Unauthorized');

    const user = await this.userRepository.findOneById(device.userId);
    const tokens = await this.createTokens(user);
    await this.updateDeviceForUser(user.id, identifier, tokens);

    return tokens;
  }

  async validate({ email, password, identifier }) {
    const user: User = await this.userRepository.findOne({ email });
    if (!user) throw new UnauthorizedException();

    const passwordVerificationString: string = this.cryptoService.hashString(password);
    const isValid: boolean = passwordVerificationString === user.password;

    if (!isValid) throw new UnauthorizedException();
    const tokens = await this.createTokens(user);
    await this.updateDeviceForUser(user.id, identifier, tokens);

    return tokens;
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
      email: email || "testUser@email.com",
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

    const tokens = await this.createTokens(updatedUser);
    return await Object.assign({}, { id: updatedUser.id }, tokens);
  }
}
