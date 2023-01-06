import { Controller, Get, Param, Delete, ParseUUIDPipe, Query, Post, Body } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import {
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { TransactionEntity } from './entities/transaction.entity';
import { GetAllTransactionDto } from './dto/get-all-transaction.dto';
import { CreateWebhookKeyDto } from './dto/create-webhook-key.dto';
import { ResultWebhookKeyDto } from './dto/result-webhook-key.dto';
import { ConfigService } from '@nestjs/config';
import { IConfig } from 'src/configs/configuration';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
    constructor(
        private readonly transactionsService: TransactionsService,
        private readonly config: ConfigService<IConfig>,
    ) {}

    @ApiOperation({ summary: 'Create transaction webhook url' })
    @ApiNotFoundResponse({ description: 'bank with this id: "bankId" not found' })
    @ApiCreatedResponse({ type: ResultWebhookKeyDto })
    @Post('/')
    async createWebhookKey(@Body() { bankId }: CreateWebhookKeyDto) {
        const port = this.config.get('port');
        const apiPrefix = this.config.get('apiPrefix');
        const key = await this.transactionsService.createWebhookKey(bankId);
        return { url: `http://127.0.0.1:${port}${apiPrefix}/transactions/${key}` };
    }

    @ApiOperation({ summary: 'Create transaction on webhook' })
    @ApiConflictResponse({ description: 'invalid key' })
    @Post('/:key')
    create(@Param('key', ParseUUIDPipe) key: string, @Body() payload: CreateTransactionDto) {
        return this.transactionsService.create(key, payload);
    }

    @ApiOperation({ summary: 'Get all transactions' })
    @ApiOkResponse({ type: TransactionEntity, isArray: true })
    @Get('/')
    findAll(@Query() { page, count }: GetAllTransactionDto) {
        page = page || 1;
        count = count || 30;
        return this.transactionsService.findAll({
            take: count * page,
            skip: count * (page - 1),
        });
    }

    @ApiOperation({ summary: 'Get transaction by id' })
    @ApiOkResponse({ type: TransactionEntity })
    @Get('/:id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.transactionsService.findOne(id);
    }

    @ApiOperation({ summary: 'Delete transaction by id' })
    @Delete('/:id')
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.transactionsService.remove(id);
    }
}
