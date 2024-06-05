import { ObjectType, Field } from '@nestjs/graphql';
import { UserType } from 'src/graphQL/users/type/user.type';

@ObjectType()
export class AuthPayload {
    @Field()
    accessToken: string;

    @Field(() => UserType)
    user: UserType;
}