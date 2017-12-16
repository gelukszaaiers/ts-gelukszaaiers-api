import { Component, Inject, HttpStatus } from "@nestjs/common";
import { HttpException } from './http.exception';

export class NotFoundException extends HttpException {
  constructor(message = "Not Found") {
    super({ message, status: HttpStatus.NOT_FOUND });
  }
}
