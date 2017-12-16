import * as crypto from "crypto";
import * as uuidV4 from "uuid/v4";
import * as config from "config";
import { DateTime } from "luxon";
import * as jwt from "jsonwebtoken";
import { Component, Inject } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../../entity/user.entity";
import { Device } from "../../entity/device.entity";

@Component()
export class AuthService {
  constructor(
    @Inject("UserRepositoryToken") private readonly userRepository: Repository<User>,
    @Inject("DeviceRepositoryToken") private readonly deviceRepository: Repository<Device>
  ) {}

  async createRefreshToken() {
    const algorithm = "sha512";
    const hash = crypto.createHash(algorithm);
    hash.update(uuidV4());
    const refreshToken = hash.digest("hex");
    return refreshToken;
  }

  async createTokens(user) {
    const expiresIn = 60 * 60;
    const secretOrKey = "secret";
    const accessToken = jwt.sign({
      id: user.id,
      langCode: user.langCode,
      email: user.email,
      name: user.name
    },
      config.get("authentication.secret"),
      {
        expiresIn: config.get("authentication.accessTokenExpiration")
      });
    const refreshToken = await this.createRefreshToken();

    return { expires_in: expiresIn, accessToken, refreshToken };
  }

  async updateDeviceForUser(userId, identifier, tokens) {
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
