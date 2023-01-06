import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { BanksService } from '../banks/banks.service';
import { WebhookKeysService } from '../webhook-keys/webhook-keys.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionEntity } from './entities/transaction.entity';
import { TransactionType } from './enums/transaction-type.enum';
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

    async create(key: string, payload: CreateTransactionDto) {
        const keyResult = await this.webhookKeysService.get<ITransactionKeyResult>(key);
        if (!keyResult) throw new ConflictException('invalid key');

        this.changeBankBalance(keyResult.bankId, payload.amount, payload.type);
        payload['categories'] = payload.categoryIds.map((id) => ({ id }));
        return this.transactionRepository.save({ bankId: keyResult.bankId, ...payload });
    }

    findAll(options?: FindManyOptions<TransactionEntity>): Promise<TransactionEntity[]> {
        return this.transactionRepository.find(options);
    }

    findOne(id: string): Promise<TransactionEntity> {
        return this.transactionRepository.findOneBy({ id });
    }

    async remove(id: string) {
        let { bankId, amount, type } = await this.findOne(id);
        type = type === TransactionType.Profitable ? TransactionType.Consumable : TransactionType.Profitable;
        this.changeBankBalance(bankId, amount, type);
        return this.transactionRepository.delete(id);
    }

    private async changeBankBalance(bankId: string, amount: number, type: TransactionType) {
        let { balance } = await this.banksService.findOne(bankId);
        if (type === TransactionType.Profitable) {
            balance = balance + amount;
        } else {
            balance = balance - amount;
        }
        this.banksService.update(bankId, { balance });
    }
}
