import { Component, Inject, HttpStatus } from "@nestjs/common";
import { HttpException } from './http.exception';

export class PayloadTooLargeException extends HttpException {
  constructor(message = "Payload Too Large") {
    super({ message, status: HttpStatus.PAYLOAD_TOO_LARGE });
  }
}
