import { Component, Inject, HttpStatus } from "@nestjs/common";
import { HttpException } from './http.exception';

export class UnauthorizedException extends HttpException {
  constructor(message = "Unauthorized") {
    super({ message, status: HttpStatus.UNAUTHORIZED });
  }
}
