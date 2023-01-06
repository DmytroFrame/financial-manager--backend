import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WebhookKeyEntity } from './entities/webhook-key.entity';

@Injectable()
export class WebhookKeysService {
    constructor(
        @InjectRepository(WebhookKeyEntity)
        private readonly webhookRepository: Repository<WebhookKeyEntity>,
    ) {}

    async create(values?: object): Promise<string> {
        const result = await this.webhookRepository.save({ values });
        return result.id;
    }

    async get<T>(key: string): Promise<T> {
        const result = await this.webhookRepository.findOneBy({ id: key });
        return result.values as T;
    }

    async remove(key: string): Promise<boolean> {
        const result = await this.webhookRepository.delete({ id: key });
        return !!result.affected;
    }
}
