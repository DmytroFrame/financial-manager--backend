import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntitySchema {
    @ApiProperty({ example: `FAKE#${randomUUID()}` })
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @ApiProperty()
    @CreateDateColumn()
    createAt?: Date;

    @ApiProperty()
    @UpdateDateColumn()
    updateAt?: Date;
}
