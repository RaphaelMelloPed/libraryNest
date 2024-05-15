import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorEntity } from './entities/author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(AuthorEntity)
    private authorsRepository: Repository<AuthorEntity>,
  ) {}

  async create({ name }: CreateAuthorDto) {
    const existingAuthor = await this.authorsRepository.findOne({
      where: { name: name },
    });

    if (existingAuthor) {
      return 'This author already exist';
    }

    const newAuthor = await this.authorsRepository.create({ name });

    return await this.authorsRepository.save(newAuthor);
  }

  async findAll() {
    const allAuthors = await this.authorsRepository.find();

    if (!allAuthors) {
      throw new NotFoundException('There are no authors');
    }

    return allAuthors;
  }

  async findOne(id: number) {
    const findAuthors = await this.authorsRepository.findOne({ where: { id } });

    if (!findAuthors) {
      throw new NotFoundException('Author not found');
    }

    return findAuthors;
  }

  async update(id: number, { name }: UpdateAuthorDto) {
    const findAuthors = await this.authorsRepository.findOne({ where: { id } });

    if (!findAuthors) {
      throw new NotFoundException('Author not found');
    }

    await this.authorsRepository.update(id, { name });

    const updatedAuthor = await this.authorsRepository.findOne({
      where: { id },
    });

    return updatedAuthor;
  }

  async remove(id: number) {
    const findAuthors = await this.authorsRepository.findOne({ where: { id } });

    if (!findAuthors) {
      throw new NotFoundException('Author not found');
    }

    const deleteAuthor = await this.authorsRepository.delete({ id });

    return deleteAuthor;
  }
}
