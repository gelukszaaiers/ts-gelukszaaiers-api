import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './modules/app.module';
import { HttpExceptionFilter } from './modules/common/filters/http-exception.filter';
import { NestExceptionFilter } from './modules/common/filters/nest-exception.filter';
async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.useGlobalFilters(new HttpExceptionFilter(), new NestExceptionFilter());
  // app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix('api/v1');
  await app.listen(3000);
}
bootstrap();
