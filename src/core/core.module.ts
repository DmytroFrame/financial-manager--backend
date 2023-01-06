import { MiddlewareConsumer, Module } from '@nestjs/common';
import { BanksModule } from './banks/banks.module';
import { CategoriesModule } from './categories/categories.module';
import { TransactionsModule } from './transactions/transactions.module';
import { StatisticsModule } from './statistics/statistics.module';
import { AppLoggerMiddleware } from './app-logger.middleware';

@Module({
    imports: [BanksModule, CategoriesModule, TransactionsModule, StatisticsModule],
})
export class CoreModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(AppLoggerMiddleware).forRoutes('*');
    }
}
