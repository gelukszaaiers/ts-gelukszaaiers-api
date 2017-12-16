import { Component, Inject, HttpStatus } from "@nestjs/common";
import { HttpException } from './http.exception';

export class BadRequestException extends HttpException {
  constructor(message = "Bad Request") {
    super({ message, status: HttpStatus.BAD_REQUEST });
  }
}
