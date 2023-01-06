import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';

@ApiTags('Categories')
@Controller('/categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @ApiOperation({ summary: 'Create category' })
    @ApiCreatedResponse({ type: CategoryEntity })
    @Post('/')
    create(@Body() payload: CreateCategoryDto) {
        return this.categoriesService.create(payload);
    }

    @ApiOperation({ summary: 'Get all category' })
    @ApiOkResponse({ type: CategoryEntity, isArray: true })
    @Get('/')
    findAll() {
        return this.categoriesService.findAll();
    }

    @ApiOperation({ summary: 'Get category by id' })
    @ApiOkResponse({ type: CategoryEntity })
    @Get('/:id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.categoriesService.findOne(id);
    }

    @ApiOperation({ summary: 'Edit category by id' })
    @Patch('/:id')
    update(@Param('id', ParseUUIDPipe) id: string, @Body() payload: UpdateCategoryDto) {
        return this.categoriesService.update(id, payload);
    }

    @ApiOperation({ summary: 'Delete category by id' })
    @Delete('/:id')
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.categoriesService.remove(id);
    }
}
