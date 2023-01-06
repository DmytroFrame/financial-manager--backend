import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { CategoriesModule } from '../categories/categories.module';
import { TransactionsModule } from '../transactions/transactions.module';

@Module({
    imports: [CategoriesModule, TransactionsModule],
    controllers: [StatisticsController],
    providers: [StatisticsService],
})
export class StatisticsModule {}
