import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const envConfig = app.get(ConfigService);

  await app.listen(envConfig.get('SERVER_PORT', 3000));

  const appService: AppService = new AppService();
  await appService.getSubscriptionMetadata();

  await app.close();

  console.log('Operation Done 🚀');

  process.exit();
}
bootstrap();
