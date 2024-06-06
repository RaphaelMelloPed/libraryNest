import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../../users/entities/user.entity";
import { BookEntity } from "../../books/entities/book.entity";

@Entity({
    name: 'reviews'
})
export class ReviewEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rating: number;

    @Column({
        type: "longtext"
    })
    comment: string;

    @ManyToOne(() => UserEntity, { nullable: false })
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @ManyToOne(() => BookEntity, { onDelete: 'CASCADE', nullable: false })
    @JoinColumn({ name: 'book_id' })
    book: BookEntity;
}
