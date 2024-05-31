import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CategoryType {
   
    @Field(() => ID)
    id: number;

    @Field()
    name: string


}