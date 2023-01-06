import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { IConfig } from './configuration';

export default (configService: ConfigService<IConfig>): TypeOrmModuleOptions => ({
    type: 'postgres',
    url: configService.get('dbUrl'),
    autoLoadEntities: true,
    synchronize: true,
});
