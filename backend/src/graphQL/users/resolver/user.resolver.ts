import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from 'src/users/users.service'
import { UserType } from '../type/user.type';
import { CreateUserInput } from '../input/user.input';

@Resolver('User')
export class UserResolver {
    constructor(
        private readonly usersService: UsersService,
        private readonly cloudinaryService: CloudinaryService,
    ) { }

    @Query(() => [UserType])
    async users() {
        return this.usersService.findAll();
    }
    
    @Query(() => UserType)
    async user(@Args('id') id: number) {
        return this.usersService.findOne(id);
    }

    @Mutation(() => UserType)
    async createUser(
        @Args('data') data: CreateUserInput,
    ) {
        try {
            const user = await this.usersService.create({ ...data });
    
            return user;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    @Mutation(() => UserType)
    async updateUser(
        @Args('id') id: number,
        @Args('input') input: CreateUserInput,
    ) {
        return this.usersService.update(+id, {...input, });
    }

    @Mutation(() => UserType)
    async removeUser(@Args('id') id: number) {
        return this.usersService.remove(+id);
    }
}
