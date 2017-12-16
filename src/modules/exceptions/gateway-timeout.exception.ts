import { Component, Inject, HttpStatus } from "@nestjs/common";
import { HttpException } from './http.exception';

export class GatewayTimeoutException extends HttpException {
  constructor(message = "Gateway Timeout") {
    super({ message, status: HttpStatus.GATEWAY_TIMEOUT });
  }
}
