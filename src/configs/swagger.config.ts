import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const config = new DocumentBuilder()
    .setTitle('Financial Manager')
    .setDescription('The Financial Manager API description')
    .setVersion('1.0.0')
    .build();

export default (app: INestApplication) => SwaggerModule.createDocument(app, config);
