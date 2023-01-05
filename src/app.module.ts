import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from './core/core.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: 'postgres://postgres:root@localhost:5432/codica-task',
            autoLoadEntities: true,
            synchronize: true,
        }),
        CoreModule,
    ],
})
export class AppModule {}
