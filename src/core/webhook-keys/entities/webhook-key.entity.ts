import { BaseEntitySchema } from 'src/common/schemas/base-entity.schema';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'webhook-keys' })
export class WebhookKeyEntity extends BaseEntitySchema {
    @Column({ type: 'json' })
    values: object;
}
