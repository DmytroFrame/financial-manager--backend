import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsUUID } from 'class-validator';
import { randomUUID } from 'crypto';
import { TransactionType } from '../enums/transaction-type.enum';

export class CreateTransactionDto {
    @ApiProperty({ default: 1.0 })
    @IsNumber()
    amount!: number;

    @ApiProperty({ enum: TransactionType })
    @IsEnum(TransactionType)
    type!: TransactionType;

    @ApiProperty({ isArray: true, example: [`FAKE#${randomUUID()}`] })
    @IsUUID('4', { each: true })
    categoryIds!: string[];
}
