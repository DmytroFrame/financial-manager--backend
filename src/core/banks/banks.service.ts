import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';
import { BankEntity } from './entities/bank.entity';

@Injectable()
export class BanksService {
    constructor(@InjectRepository(BankEntity) private readonly bankRepository: Repository<BankEntity>) {}

    create(payload: CreateBankDto) {
        return this.bankRepository.save(payload);
    }

    findAll() {
        return this.bankRepository.find();
    }

    findOne(id: string) {
        return this.bankRepository.findOneBy({ id });
    }

    update(id: string, payload: UpdateBankDto) {
        return this.bankRepository.update(id, payload);
    }

    async remove(id: string) {
        try {
            return await this.bankRepository.delete(id);
        } catch (error) {
            throw new ConflictException(error.toString());
        }
    }
}
