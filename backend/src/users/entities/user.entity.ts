import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    unique: true,
  })
  name: string;

  @Column({
    length: 255,
  })
  password: string;

  @Column({
    type: 'longtext',
  })
  image: string;

  @Column({
    type: 'enum',
    enum: [0, 1],
    default: 0,
  })
  admin: 0 | 1;
}
