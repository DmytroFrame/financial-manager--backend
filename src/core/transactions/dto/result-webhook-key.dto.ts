import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class ResultWebhookKeyDto {
    @ApiProperty({ example: `http://127.0.0.1:Port/api/transactions/FAKE#${randomUUID()}` })
    url: string;
}
