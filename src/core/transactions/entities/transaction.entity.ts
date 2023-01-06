import { ApiProperty } from '@nestjs/swagger';
import { BaseEntitySchema } from 'src/common/schemas/base-entity.schema';
import { ColumnNumericTransformer } from 'src/common/transformers/column-numeric.transformer';
import { BankEntity } from 'src/core/banks/entities/bank.entity';
import { CategoryEntity } from 'src/core/categories/entities/category.entity';
import { Entity, Column, ManyToMany, JoinTable, ManyToOne, JoinColumn } from 'typeorm';
import { TransactionType } from '../enums/transaction-type.enum';

@Entity({ name: 'transactions' })
export class TransactionEntity extends BaseEntitySchema {
    @ApiProperty({ default: 1.0 })
    @Column({ type: 'numeric', precision: 7, scale: 2, transformer: new ColumnNumericTransformer() })
    amount!: number;

    @Column({ type: 'enum', enum: TransactionType })
    type!: TransactionType;

    @ManyToMany(() => CategoryEntity)
    @JoinTable({ name: 'transaction-to-category' })
    category: CategoryEntity[];

    @Column()
    bankId!: string;

    @ManyToOne(() => BankEntity, (bank) => bank.transactions)
    @JoinColumn({ name: 'bankId' })
    bank: BankEntity;
}
