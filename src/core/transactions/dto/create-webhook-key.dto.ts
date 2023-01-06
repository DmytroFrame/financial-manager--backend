import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateWebhookKeyDto {
    @ApiProperty()
    @IsUUID('4')
    bankId: string;
}
