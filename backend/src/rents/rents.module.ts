import { Module } from '@nestjs/common';
import { RentsService } from './rents.service';
import { RentsController } from './rents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentEntity } from './entities/rent.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { BookEntity } from 'src/books/entities/book.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RentEntity]),
    UserEntity,
    BookEntity
  ],
  controllers: [RentsController],
  providers: [RentsService],
})
export class RentsModule {}
