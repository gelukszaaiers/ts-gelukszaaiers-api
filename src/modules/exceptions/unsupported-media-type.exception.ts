import { Component, Inject, HttpStatus } from "@nestjs/common";
import { HttpException } from './http.exception';

export class UnsupportedMediaTypeException extends HttpException {
  constructor(message = "Unsupported Media Type") {
    super({ message, status: HttpStatus.UNSUPPORTED_MEDIA_TYPE });
  }
}
