import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoryRepository: Repository<CategoryEntity>,
    ) {}

    create(payload: CreateCategoryDto) {
        return this.categoryRepository.save(payload);
    }

    findAll() {
        return this.categoryRepository.find();
    }

    findOne(id: string) {
        return this.categoryRepository.findOneBy({ id });
    }

    update(id: string, payload: UpdateCategoryDto) {
        return this.categoryRepository.update(id, payload);
    }

    remove(id: string) {
        return this.categoryRepository.delete(id);
    }
}
