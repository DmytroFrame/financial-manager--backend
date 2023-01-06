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

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) {}

    @ApiOperation({ summary: 'Create transaction webhook url' })
    @ApiNotFoundResponse({ description: 'bank with this id: "bankId" not found' })
    @ApiCreatedResponse({ type: ResultWebhookKeyDto })
    @Post('/')
    async createWebhookKey(@Body() { bankId }: CreateWebhookKeyDto) {
        const key = await this.transactionsService.createWebhookKey(bankId);
        return { url: `http://127.0.0.1:Port/api/transactions/${key}` };
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
    findAll(@Query() query: GetAllTransactionDto) {
        query.page = query.page || 1;
        query.count = query.count || 30;
        return this.transactionsService.findAll(query);
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
