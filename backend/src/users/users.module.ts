import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UsersController } from './users.controller';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]),
CloudinaryModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
