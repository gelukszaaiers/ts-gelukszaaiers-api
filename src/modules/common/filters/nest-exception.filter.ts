import { ErrorSerializer } from 'jsonade';
import * as config from 'config';
import { v4 as uuidV4 } from 'uuid';
import { ExceptionFilter, Catch, HttpException as NestException } from '@nestjs/common';
import { HttpException } from '../../exceptions/http.exception';

@Catch(NestException)
export class NestExceptionFilter implements ExceptionFilter {
  public catch(exception: NestException, response) {
    const jsonException = JSON.parse(JSON.stringify(exception));
    const errors = ErrorSerializer.serialize({
      id: uuidV4(),
      status: jsonException.status,
      title: jsonException.message,
      detail: jsonException.response,
    })
    response.status(500).json(errors);
  }
}
