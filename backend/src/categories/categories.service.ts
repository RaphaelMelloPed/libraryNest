import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './entities/category.entity';
import { CreateCategoryInput } from 'src/graphQL/categories/input/category.input';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>
  ) { }

  async create({ name }: CreateCategoryInput): Promise<CategoryEntity> {
    const existingCategory = await this.categoryRepository.findOne({
      where: {
        name: name
      }
    });
  
    if (existingCategory) {
      throw new ConflictException("Category already exists");
    }
  
    const newCategory = this.categoryRepository.create({ name });
    return await this.categoryRepository.save(newCategory);
  }
  

  async findAll() {
    const allCategories = await this.categoryRepository.find({
      where: {
        deletedAt: null
      }
    });
    return allCategories;
  }

  async findOne(id: number) {
    const existingCategory = await this.categoryRepository.findOne({ 
      where: { 
        id,
        deletedAt: null // Garante que a categoria não está deletada
      } 
    });

    if (!existingCategory) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return existingCategory;
  }

  async update(id: number, { name }: CreateCategoryInput) {

    const existingCategory = await this.categoryRepository.findOne({ 
      where: { 
        id,
        deletedAt: null // Garante que a categoria não está deletada
      } 
    });

    if (!existingCategory) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    await this.categoryRepository.update(id, { name });

    const updatedCategory = await this.categoryRepository.findOne({ where: { id } });

    return updatedCategory;
  }

  async remove(id: number) {
    const findCategory = await this.categoryRepository.findOne({ where: { id } });

    if (!findCategory) {
      throw new NotFoundException('Category not found');
    }

    const deleteCategory = await this.categoryRepository.delete({ id });

    return deleteCategory;
  }

  async softDelete(id: number) {

    const existingCategory = await this.categoryRepository.findOne({ 
      where: { 
        id,
        deletedAt: null
      } 
    });

    if (!existingCategory) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    existingCategory.deletedAt = new Date(); // Marca a categoria como deletada
    return await this.categoryRepository.save(existingCategory);
  }
}
