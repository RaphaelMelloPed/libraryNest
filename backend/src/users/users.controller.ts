import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../guards/auth.guards';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image')) 
  async create(@Body() data: CreateUserDto, @UploadedFile() file: Express.Multer.File) {
    const imageUrl = await this.cloudinaryService.uploadImage(file);
    console.log(imageUrl);
    const createUser = await this.usersService.create({ ...data, image: imageUrl });
    console.log(createUser);
    return createUser;
  }


  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image')) 
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @UploadedFile() file?: Express.Multer.File) {
    let imageUrl;
    if (file) {
      imageUrl = await this.cloudinaryService.uploadImage(file);
    }
    console.log(file);
    return this.usersService.update(+id, { ...updateUserDto, image: imageUrl });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
