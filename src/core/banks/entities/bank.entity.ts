import { ApiProperty } from '@nestjs/swagger';
import { BaseEntitySchema } from 'src/common/schemas/base-entity.schema';
import { ColumnNumericTransformer } from 'src/common/transformers/column-numeric.transformer';
import { TransactionEntity } from 'src/core/transactions/entities/transaction.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'banks' })
export class BankEntity extends BaseEntitySchema {
    @ApiProperty()
    @Column()
    name!: string;

    @ApiProperty({ default: 0.0 })
    @Column({
        type: 'numeric',
        precision: 7,
        scale: 2,
        transformer: new ColumnNumericTransformer(),
        default: 0.0,
    })
    balance?: number;

    @OneToMany(() => TransactionEntity, (transaction) => transaction.bank)
    transactions?: TransactionEntity[];
}
