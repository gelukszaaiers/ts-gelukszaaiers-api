import { v4 as uuidV4 } from 'uuid';

interface ErrorInterface {
  status: number;
  message: string;
  detail?: string;
  stack?: string;
}

export class HttpException extends Error {
  id: string;
  status: number;
  detail: string;

  constructor(error: ErrorInterface) {
    super(error.message);
    this.id = uuidV4();
    this.status = error.status;
    this.detail = error.detail;
    this.name = 'HttpException';
  }
}
