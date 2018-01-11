import { Component, Inject, HttpStatus } from "@nestjs/common";
import { HttpException } from './http.exception';

export class InvalidInputException extends HttpException {
  detail: string;

  constructor(message = "Invalid Input", detail) {
    super({ message, status: HttpStatus.BAD_REQUEST });
    this.detail = detail;
    this.name = 'InvalidInputException';
  }
}
