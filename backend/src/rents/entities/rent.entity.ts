import { UserEntity } from 'src/users/entities/user.entity';
import { BookEntity } from 'src/books/entities/book.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity({name: 'rents'})
export class RentEntity {
    @PrimaryGeneratedColumn({
        unsigned: true
    })
    id: number;

    @Column({
        type: 'date'
    })
    pick_up_date: string

    @Column({
        type: 'date'
    })
    returns_date: string

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity

    @ManyToOne(() => BookEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'book_id' })
    book: BookEntity

}
