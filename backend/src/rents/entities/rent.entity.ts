import { UserEntity } from '../../users/entities/user.entity';
import { BookEntity } from '../../books/entities/book.entity';
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
    pick_up_date: Date

    @Column({
        type: 'date'
    })
    returns_date: Date

    @JoinColumn({ name: 'user_id' })
    @ManyToOne(() => UserEntity)
    user: UserEntity

    @JoinColumn({ name: 'book_id' })
    @ManyToOne(() => BookEntity, { onDelete: 'CASCADE' })
    book: BookEntity

}
