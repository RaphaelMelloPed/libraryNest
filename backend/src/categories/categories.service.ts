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

    return await this.categoriesRepository.save(newCategory);
  }

  async findAll() {
    const allCategories = await this.categoriesRepository.find();

    if (!allCategories) {
      throw new NotFoundException('There are no categories');
    }

    return allCategories;
  }

  async findOne(id: number) {
    const findCategory = await this.categoriesRepository.findOne({
      where: { id },
    });

    if (!findCategory) {
      throw new NotFoundException('Category not found!');
    }

    return findCategory;
  }

  async update(id: number, { name }: UpdateCategoryDto) {
    const findCategory = await this.categoriesRepository.findOne({
      where: { id },
    });

    if (!findCategory) {
      throw new NotFoundException('Category not found!');
    }

    await this.categoriesRepository.update(id, { name });

    const updateCategory = await this.categoriesRepository.findOne({
      where: { id },
    });

    return updateCategory;
  }

  async remove(id: number) {
    const findCategory = await this.categoriesRepository.findOne({
      where: { id },
    });

    if (!findCategory) {
      throw new NotFoundException('Category not found!');
    }

    const deleteCategory = await this.categoriesRepository.delete({ id });

    return deleteCategory;
  }
}
