import { CategoryType } from 'src/graphQL/categories/type/category.type';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { AuthorType } from 'src/graphQL/authors/type/author.type';

@ObjectType()
export class BookType {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  quantity: number;

  @Field()
  image: string;

  @Field()
  description: string;

  @Field(() => CategoryType)
  category: CategoryType;

  @Field(() => AuthorType)
  author: AuthorType;
}
