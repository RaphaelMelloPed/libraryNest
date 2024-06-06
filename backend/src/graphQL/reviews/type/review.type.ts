import { UserType } from 'src/graphQL/users/type/user.type';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BookType } from 'src/graphQL/books/type/book.type';

@ObjectType()
export class ReviewType {
  @Field(() => ID)
  id: number;

  @Field()
  rating: number;

  @Field()
  comment: string;

  @Field(() => UserType)
  user: UserType;

  @Field(() => BookType)
  author: BookType;
}
