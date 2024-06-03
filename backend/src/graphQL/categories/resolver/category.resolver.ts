import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoriesService } from '../../../categories/categories.service';
import { CategoryType } from '../type/category.type';
import { CreateCategoryArgs } from '../args/category.args';
import { CreateCategoryInput } from '../input/category.input';

@Resolver(() => CategoryType)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Query(() => [CategoryType])
  findAll() {
    return this.categoriesService.findAll();
  }

  @Query(() => CategoryType)
  async category(@Args('id', { type: () => Int }) id: number) {
    return this.categoriesService.findOne(id);
  }

  @Mutation(() => CategoryType)
  async createCategory(@Args() args: CreateCategoryArgs): Promise<CategoryType> { 
    return this.categoriesService.create(args.data);
  }

  @Mutation(() => CategoryType)
  async updateCategory(
    @Args('id', { type: () => Int }) id: number,
    @Args('category') category: CreateCategoryInput,
  ) {
    return this.categoriesService.update(id, category);
  }

  @Mutation(() => CategoryType)
  async removeCategory(@Args('id', { type: () => Int }) id: number) {
    return this.categoriesService.remove(id);
  }
}
