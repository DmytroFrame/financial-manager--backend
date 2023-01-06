import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { IConfig } from './configs/configuration';
import swaggerConfig from './configs/swagger.config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = app.get(ConfigService<IConfig>);

    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
    app.setGlobalPrefix(config.get('apiPrefix'));
    SwaggerModule.setup(config.get('swaggerUiPrefix'), app, swaggerConfig(app));

    await app.listen(config.get('port'));
    Logger.log(`🚀 Application is running on: ${await app.getUrl()}${config.get('apiPrefix')}`);
}
bootstrap();
