import { AuthorEntity } from '../../authors/entities/author.entity';
import { CategoryEntity } from '../../categories/entities/category.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'books' })
export class BookEntity {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  description: string;

  @Column({
    type: 'int',
  })
  quantity: number;

  @Column({
    type: 'longtext',
  })
  image: string;

  @JoinColumn({ name: 'category_id' })
  @ManyToOne(() => CategoryEntity)
  category: CategoryEntity;

  @JoinColumn({ name: 'author_id' })
  @ManyToOne(() => AuthorEntity, { onDelete: 'CASCADE' })
  author: AuthorEntity;
}
