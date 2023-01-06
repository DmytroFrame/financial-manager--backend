import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from './entities/transaction.entity';
import { WebhookKeysModule } from '../webhook-keys/webhook-keys.module';
import { BanksModule } from '../banks/banks.module';

@Module({
    imports: [TypeOrmModule.forFeature([TransactionEntity]), WebhookKeysModule, BanksModule],
    controllers: [TransactionsController],
    providers: [TransactionsService],
})
export class TransactionsModule {}
