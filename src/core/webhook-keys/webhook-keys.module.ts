import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebhookKeyEntity } from './entities/webhook-key.entity';
import { WebhookKeysService } from './webhook-keys.service';

@Module({
    imports: [TypeOrmModule.forFeature([WebhookKeyEntity])],
    providers: [WebhookKeysService],
    exports: [WebhookKeysService],
})
export class WebhookKeysModule {}
