import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsService } from './authors.service';
import { AuthorResolver } from 'src/graphQL/authors/resolver/author.resolver';
import { AuthorEntity } from './entities/author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuthorEntity])],
  providers: [AuthorsService, AuthorResolver],
  exports: [AuthorsService],
})
export class AuthorsModule {}
