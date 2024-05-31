import { ArgsType, Field } from "@nestjs/graphql";
import { CreateCategoryInput } from "../input/category.input";

@ArgsType()
export class CreateCategoryArgs{

    @Field()
    data: CreateCategoryInput

}