import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "categories"
})
@ObjectType()
export class CategoryEntity {

    @PrimaryGeneratedColumn({
        unsigned: true
    })
    @Field(() => ID)
    id: number;

    @Field()
    @Column({
        type: "varchar",
        length: 63,
        unique: true
    })
    name: string


}