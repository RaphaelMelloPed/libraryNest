import { BookType } from 'src/graphQL/books/type/book.type';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserType } from 'src/graphQL/users/type/user.type';

@ObjectType()
export class RentType {
  @Field(() => ID)
  id: number;

  @Field()
  pick_up_date: string;

  @Field()
  returns_date: string;
  
  @Field(() => UserType)
  user: UserType

  @Field(() => BookType)
  book: BookType
}
