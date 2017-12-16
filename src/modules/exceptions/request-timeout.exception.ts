import { Component, Inject, HttpStatus } from "@nestjs/common";
import { HttpException } from './http.exception';

export class RequestTimeoutException extends HttpException {
  constructor(message = "Request Timeout") {
    super({ message, status: HttpStatus.REQUEST_TIMEOUT });
  }
}
