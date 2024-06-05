import { Module } from '@nestjs/common';
import { RentsService } from './rents.service';
import { RentsResolver } from 'src/graphQL/rents/resolver/rent.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentEntity } from './entities/rent.entity';
import { BooksModule } from '../books/books.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([RentEntity]),
    BooksModule,
    UsersModule
  ],
  providers: [RentsService, RentsResolver],
})
export class RentsModule {}
