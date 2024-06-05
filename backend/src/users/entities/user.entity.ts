import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from "@nestjs/graphql";

@Entity({ name: 'users' })
@ObjectType()
export class UserEntity {
  @Field(()=> ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({
      unique: true
  })
  email: string;

  @Field()
  @Column({
    unique: true,
  })
  name: string;

  @Field()
  @Column({
      length: 255
  })
  password: string;

  @Field()
  @Column({
      type: "longtext"
  })
  image: string;

  @Field()
  @Column({
      type: 'enum',
      enum: [0, 1],
      default: 0
  })
  admin: 0 | 1;
}