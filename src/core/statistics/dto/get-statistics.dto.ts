import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsUUID } from 'class-validator';

export class GetStatisticsDto {
    @ApiProperty()
    @Transform(({ value }) => new Date(value))
    @IsDate()
    fromPeriod: Date;

    @ApiProperty()
    @Transform(({ value }) => new Date(value))
    @IsDate()
    toPeriod: Date;

    @ApiProperty()
    @IsUUID('4', { each: true })
    @Transform(({ value }) => (typeof value === 'string' ? [value] : value))
    categoryIds: string[];
}
