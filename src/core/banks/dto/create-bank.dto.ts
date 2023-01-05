import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBankDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiPropertyOptional({ default: 0.0 })
    @IsOptional()
    @IsNumber()
    balance: number;
}
