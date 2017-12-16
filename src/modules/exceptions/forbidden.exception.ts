import { Component, Inject, HttpStatus } from "@nestjs/common";
import { HttpException } from './http.exception';

export class ForbiddenException extends HttpException {
  constructor(message = "Forbidden") {
    super({ message, status: HttpStatus.FORBIDDEN });
  }
}
