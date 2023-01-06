import { Injectable } from '@nestjs/common';
import { Between, In } from 'typeorm';
import { CategoriesService } from '../categories/categories.service';
import { TransactionType } from '../transactions/enums/transaction-type.enum';
import { TransactionsService } from '../transactions/transactions.service';
import { GetStatisticsDto } from './dto/get-statistics.dto';

@Injectable()
export class StatisticsService {
    constructor(
        private readonly categoriesService: CategoriesService,
        private readonly transactionsService: TransactionsService,
    ) {}

    private async getCategories(categoryIds: string[]): Promise<object> {
        const categoriesFromDB = await this.categoriesService.findAll({ where: { id: In(categoryIds) } });
        const categories = {};
        categoriesFromDB.forEach(({ id, name }) => {
            categories[id] = name;
        });
        return categories;
    }

    private async getTransactions({ categoryIds, fromPeriod, toPeriod }: GetStatisticsDto) {
        return this.transactionsService.findAll({
            where: { categories: { id: In(categoryIds) }, createAt: Between(fromPeriod, toPeriod) },
        });
    }

    private getCategoryAmount(categoryIds: string[]) {
        const categoryAmount = {};
        categoryIds.forEach((id) => {
            categoryAmount[id] = 0;
        });
        return categoryAmount;
    }

    private makeFinalResult(categories: object, categoryAmount: object) {
        const result = {};
        Object.keys(categories).forEach((key) => {
            if (categoryAmount[key] !== null) {
                result[categories[key]] = categoryAmount[key];
            }
        });
        return result;
    }

    async getStatistics(query: GetStatisticsDto) {
        const categories = await this.getCategories(query.categoryIds);
        const transactions = await this.getTransactions(query);
        const categoryAmount = this.getCategoryAmount(query.categoryIds);

        for (const transaction of transactions) {
            for (const categoryId of transaction.categoryIds) {
                if (transaction.type === TransactionType.Profitable) {
                    categoryAmount[categoryId] += transaction.amount;
                } else {
                    categoryAmount[categoryId] -= transaction.amount;
                }
            }
        }
        return this.makeFinalResult(categories, categoryAmount);
    }
}
