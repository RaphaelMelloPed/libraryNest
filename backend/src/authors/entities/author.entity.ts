import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'authors' })
export class AuthorEntity {
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
}
