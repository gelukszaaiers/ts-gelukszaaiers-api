import * as config from "config";
import * as crypto from "crypto";
import * as uuidV4 from "uuid/v4";
import * as jwt from "jsonwebtoken";
import { Component, Inject } from "@nestjs/common";

@Component()
export class CryptoService {
  private readonly algorithm: string;
  private readonly salt: string;
  private readonly expiresIn: string;
  private readonly secret: string;

  constructor() {
    const crypto = config.get("crypto");
    const authentication = config.get("authentication");
    this.algorithm = crypto.algorithm;
    this.salt = crypto.salt;
    this.expiresIn = authentication.accessTokenExpiration;
    this.secret = authentication.secret;

  }

  hashString(str: string = ""): string {
    const hash = crypto.createHash(this.algorithm);
    hash.update(str + this.salt);
    return hash.digest("hex");
  }

  signJwt(data): string {
    const accessToken = jwt.sign(data, this.secret, { expiresIn: this.expiresIn });
    return accessToken;
  }
}
