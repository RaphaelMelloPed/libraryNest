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
    const allCategories = await this.categoryRepository.find()
    return allCategories;
  }

  async findOne(id: number) {
    const existingCategories = await this.existing(id)

    if (!existingCategories) {
      throw new NotFoundException(`Categorie with ID ${id} not found`);
    }


    const oneCategory = await this.categoryRepository.findOne({ where: { id } })
    return oneCategory;
  }

  async update(id: number, { name }: CreateCategoryInput) {

    const existingCategories = await this.existing(id)

    if (!existingCategories) {
      throw new NotFoundException(`Categorie with ID ${id} not found`);
    }

    await this.categoryRepository.update(id, { name });

    const updatedCategory = await this.categoryRepository.findOne({ where: { id } });

    return updatedCategory;
  }

  async remove(id: number) {

    const existingCategories = await this.existing(id)

    if (!existingCategories) {
      throw new NotFoundException(`Categorie with ID ${id} not found`);
    }

    const deleteCategory = await this.categoryRepository.delete({ id })

    return deleteCategory;
  }


  existing(id: number) {
    return this.categoryRepository.findOne({
      where: {
        id
      }
    })
  }
}