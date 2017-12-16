import { Component, Inject, HttpStatus } from "@nestjs/common";
import { HttpException } from './http.exception';

export class NotAcceptableException extends HttpException {
  constructor(message = "Not Acceptable") {
    super({ message, status: HttpStatus.NOT_ACCEPTABLE });
  }
}
