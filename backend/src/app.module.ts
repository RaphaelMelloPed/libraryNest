import { join } from 'path';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
// import { RentsModule } from './rents/rents.module';
import { BooksModule } from './books/books.module';
import { UsersModule } from './users/users.module';
// import { ReviewsModule } from './reviews/reviews.module';
import { AuthorsModule } from './authors/authors.module';
// import { RentEntity } from './rents/entities/rent.entity';
import { BookEntity } from './books/entities/book.entity';
import { UserEntity } from './users/entities/user.entity';
// import { ReviewEntity } from './reviews/entities/review.entity';
import { AuthorEntity } from './authors/entities/author.entity';
import { CategoriesModule } from './categories/categories.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CategoryEntity } from './categories/entities/category.entity';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

dotenv.config();
@Module({
  imports: [
    // AuthModule,
    UsersModule,
    BooksModule,
    // RentsModule,
    AuthorsModule,
    // ReviewsModule,
    CategoriesModule,
    CloudinaryModule,

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: parseInt(process.env.PMA_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [
        AuthorEntity,
        BookEntity,
        CategoryEntity,
        // RentEntity,
        // ReviewEntity,
        UserEntity,
      ],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
