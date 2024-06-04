import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserType {
    @Field(() => ID)
    id: number;

    @Field()
    email: string;

    @Field()
    name: string;

    @Field()
    password: string;

    @Field()
    image: string;
}