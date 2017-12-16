import { Component, Inject, HttpStatus } from "@nestjs/common";
import { HttpException } from './http.exception';

export class ServiceUnavailableException extends HttpException {
  constructor(message = "Service Unavailable") {
    super({ message, status: HttpStatus.SERVICE_UNAVAILABLE });
  }
}
