import { Component, Inject, HttpStatus } from "@nestjs/common";
import { HttpException } from './http.exception';

export class InternalServerErrorException extends HttpException {
  constructor(message = "Internal Server Error") {
    super({ message, status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}
