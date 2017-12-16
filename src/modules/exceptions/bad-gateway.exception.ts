import { Component, Inject, HttpStatus } from "@nestjs/common";
import { HttpException } from './http.exception';

export class BadGatewayException extends HttpException {
  constructor(message = "Bad Gateway") {
    super({ message, status: HttpStatus.BAD_GATEWAY });
  }
}
