import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BanksService } from '../banks/banks.service';
import { WebhookKeysService } from '../webhook-keys/webhook-keys.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { GetAllTransactionDto } from './dto/get-all-transaction.dto';
import { TransactionEntity } from './entities/transaction.entity';
import { ITransactionKeyResult } from './interfaces/transaction-key-result.interface';

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(TransactionEntity)
        private readonly transactionRepository: Repository<TransactionEntity>,
        private readonly webhookKeysService: WebhookKeysService,
        private readonly banksService: BanksService,
    ) {}

    async createWebhookKey(bankId: string): Promise<string> {
        if (!(await this.banksService.findOne(bankId)))
            throw new NotFoundException(`bank with this id: "${bankId}" not found`);
        return this.webhookKeysService.create({ bankId } as ITransactionKeyResult);
    }

    async create(key: string, payload: CreateTransactionDto): Promise<void> {
        const keyResult = await this.webhookKeysService.get<ITransactionKeyResult>(key);
        if (!keyResult) throw new ConflictException('invalid key');
        this.transactionRepository.save({ ...payload, bankId: keyResult.bankId });
    }

    findAll({ page, count }: GetAllTransactionDto): Promise<TransactionEntity[]> {
        return this.transactionRepository.find({
            take: count * page,
            skip: count * (page - 1),
        });
    }

    findOne(id: string): Promise<TransactionEntity> {
        return this.transactionRepository.findOneBy({ id });
    }

    remove(id: string) {
        return this.transactionRepository.delete(id);
    }
}
