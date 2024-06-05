import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RentsService } from 'src/rents/rents.service';
import { RentType } from '../type/rent.type';
import { CreateRentInput } from '../input/rent.input';
import { CreateRentArgs } from '../args/rent.args';

@Resolver('Rent')
export class RentsResolver {
  constructor(private readonly rentsService: RentsService) {}

  @Query(() => [RentType])
  async rents() {
    return this.rentsService.findAll();
  }

  @Query(() => RentType)
  async rent(@Args('id') id: number) {
    return this.rentsService.findOne(id);
  }

  @Mutation(() => RentType)
  async createRent(@Args() args: CreateRentArgs): Promise<RentType> {
      return this.rentsService.create(args.data);
  }

  @Mutation(() => RentType)
  async updateRent(
    @Args('id') id: number,
    @Args('input') input: CreateRentInput,
  ) {
    return this.rentsService.update(id, input);
  }

  @Mutation(() => RentType)
  async removeRent(@Args('id') id: number) {
    return this.rentsService.remove(id);
  }
}
