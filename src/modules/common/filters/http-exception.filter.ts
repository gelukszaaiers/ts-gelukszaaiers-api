import { ErrorSerializer } from 'jsonade';
import * as config from 'config';
import { ExceptionFilter, Catch } from '@nestjs/common';
import { HttpException } from '../../exceptions/http.exception';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  /*
   * JSONADE takes the following keys:
   *   status   required
   *   title    required
   *   id       optional
   *   code     optional, application specific
   *   detail   optional
   *   meta     optional
   *
   *   cfr. https://github.com/icapps/jsonade
   */
  private serialize(exceptions) {
    const showStackTrace = config.get('showStackTrace') == 'true';
    const formattedExceptions = exceptions.map(ex => ({
      id: ex.id,
      status: ex.status,
      title: ex.message,
      detail: ex.detail,
      code: ex.code,
      meta: showStackTrace ? { stack: ex.stack } : undefined,
    }));

    return ErrorSerializer.serialize(formattedExceptions);
  }

  public catch(exception: HttpException, response) {
    const status = exception.status;
    const errors = this.serialize([exception]);
    response.status(status).json(errors);
  }
}
