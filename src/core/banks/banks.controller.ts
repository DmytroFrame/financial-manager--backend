import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BanksService } from './banks.service';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';
import { BankEntity } from './entities/bank.entity';

@ApiTags('Banks')
@Controller('/banks')
export class BanksController {
    constructor(private readonly banksService: BanksService) {}

    @ApiOperation({ summary: 'Create bank' })
    @ApiCreatedResponse({ type: BankEntity })
    @Post('/')
    create(@Body() payload: CreateBankDto) {
        return this.banksService.create(payload);
    }

    @ApiOperation({ summary: 'Get all banks' })
    @ApiOkResponse({ type: BankEntity, isArray: true })
    @Get('/')
    findAll() {
        return this.banksService.findAll();
    }

    @ApiOperation({ summary: 'Get bank by id' })
    @ApiOkResponse({ type: BankEntity })
    @Get('/:id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.banksService.findOne(id);
    }

    @ApiOperation({ summary: 'Edit bank by id' })
    @Patch('/:id')
    update(@Param('id', ParseUUIDPipe) id: string, @Body() payload: UpdateBankDto) {
        return this.banksService.update(id, payload);
    }

    @ApiOperation({ summary: 'Delete bank by id' })
    @Delete('/:id')
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.banksService.remove(id);
    }
}
