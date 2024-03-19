import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: [process.env.FRONTEND_URL],
  });
  app.setGlobalPrefix(`/api`);
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(process.env.PORT || 8000);
}
bootstrap();
