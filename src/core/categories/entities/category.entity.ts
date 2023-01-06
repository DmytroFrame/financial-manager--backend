import { ApiProperty } from '@nestjs/swagger';
import { BaseEntitySchema } from 'src/common/schemas/base-entity.schema';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'categories' })
export class CategoryEntity extends BaseEntitySchema {
    @ApiProperty()
    @Column()
    name!: string;
}
