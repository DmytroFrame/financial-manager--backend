import { Module } from '@nestjs/common';
import { BanksModule } from './banks/banks.module';
import { CategoriesModule } from './categories/categories.module';
import { TransactionsModule } from './transactions/transactions.module';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
    imports: [BanksModule, CategoriesModule, TransactionsModule, StatisticsModule],
})
export class CoreModule {}
