import { UserEntity } from '../../users/entities/user.entity';
import { BookEntity } from '../../books/entities/book.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Field } from '@nestjs/graphql';

@Entity({name: 'rents'})
export class RentEntity {

    @PrimaryGeneratedColumn({
        unsigned: true
    })
    @Field()
    id: number;

    @Column()
    @Field()
    pick_up_date: string

    @Column()
    @Field()
    returns_date: string

    @Field()
    @JoinColumn({ name: 'user_id' })
    @ManyToOne(() => UserEntity)
    user: UserEntity

    @Field()
    @JoinColumn({ name: 'book_id' })
    @ManyToOne(() => BookEntity, { onDelete: 'CASCADE' })
    book: BookEntity

}
