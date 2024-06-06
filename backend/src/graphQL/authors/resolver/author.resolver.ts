import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthorsService } from 'src/authors/authors.service';
import { AuthorType } from '../type/author.type';
import { CreateAuthorArgs } from '../args/author.args';
import { CreateAuthorInput } from '../input/author.input';
import { SoftDeleteAuthorInput } from '../input/softDeleteAuthor.input';

@Resolver(() => AuthorType)
export class AuthorResolver {
  constructor(private readonly authorsService: AuthorsService) {}

  @Query(() => [AuthorType])
  authors() {
    return this.authorsService.findAll();
  }

  @Query(() => AuthorType)
  async author(@Args('id', { type: () => Int }) id: number) {
    return this.authorsService.findOne(id);
  }

  @Mutation(() => AuthorType)
  async createAuthor(@Args() args: CreateAuthorArgs): Promise<AuthorType> {
    return this.authorsService.create(args.data);
  }

  @Mutation(() => AuthorType)
  async updateAuthor(
    @Args('id', { type: () => Int }) id: number,
    @Args('author') author: CreateAuthorInput,
  ) {
    return this.authorsService.update(id, author);
  }

  @Mutation(() => AuthorType)
  async removeAuthor(@Args('id', { type: () => Int }) id: number) {
    return this.authorsService.remove(id);
  }

  @Mutation(() => AuthorType)
  async softDeleteAuthor(@Args('input') input: SoftDeleteAuthorInput): Promise<AuthorType> {
    return this.authorsService.softDelete(input.id);
  }
}
