import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoriesRepository: Repository<CategoryEntity>,
  ) {}

  async create({ name }: CreateCategoryDto) {
    const existingCategory = await this.categoriesRepository.findOne({
      where: { name: name },
    });

    if (existingCategory) {
      return 'This category already exist';
    }

    const newCategory = await this.categoriesRepository.create({ name });

    return await this.categoriesRepository.save(newCategory)
    
  }

  findAll() {
    return `This action returns all categories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
