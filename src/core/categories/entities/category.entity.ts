import { ApiProperty } from '@nestjs/swagger';
import { BaseEntitySchema } from 'src/common/schemas/base-entity.schema';
import { TransactionEntity } from 'src/core/transactions/entities/transaction.entity';
import { Entity, Column, ManyToMany } from 'typeorm';

@Entity({ name: 'categories' })
export class CategoryEntity extends BaseEntitySchema {
    @ApiProperty()
    @Column()
    name!: string;

    @ManyToMany(() => TransactionEntity, (transactions) => transactions.categories)
    transactions: TransactionEntity[];
}
