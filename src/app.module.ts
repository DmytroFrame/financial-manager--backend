import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './configs/configuration';
import typeormConfig from './configs/typeorm.config';
import { CoreModule } from './core/core.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            isGlobal: true,
            cache: true,
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: typeormConfig,
        }),
        CoreModule,
    ],
})
export class AppModule {}
