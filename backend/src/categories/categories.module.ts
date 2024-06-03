import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { CategoriesResolver } from 'src/graphQL/categories/resolver/category.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  providers: [CategoriesService, CategoriesResolver], 
  exports: [CategoriesService]
})
export class CategoriesModule { }