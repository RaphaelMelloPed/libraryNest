import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserResolver } from 'src/graphQL/users/resolver/user.resolver';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]),
CloudinaryModule],
  providers: [UsersService, UserResolver],
  exports: [UsersService]
})
export class UsersModule {}
