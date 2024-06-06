import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorEntity } from './entities/author.entity';
import { CreateAuthorInput } from 'src/graphQL/authors/input/author.input';
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(AuthorEntity)
    private authorsRepository: Repository<AuthorEntity>,
  ) {}

  async create({ name }: CreateAuthorInput) {
    const existingAuthor = await this.authorsRepository.findOne({
      where: { name: name },
    });

    if (existingAuthor) {
      throw new ConflictException('This author already exists');
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
    const findAuthor = await this.authorsRepository.findOne({ where: { id } });

    if (!findAuthor) {
      throw new NotFoundException('Author not found');
    }

    return findAuthor;
  }

  async update(id: number, { name }: CreateAuthorInput) {
    const findAuthor = await this.authorsRepository.findOne({ where: { id } });

    if (!findAuthor) {
      throw new NotFoundException('Author not found');
    }

    await this.authorsRepository.update(id, { name });

    const updatedAuthor = await this.authorsRepository.findOne({
      where: { id },
    });

    return updatedAuthor;
  }

  async remove(id: number) {
    const findAuthor = await this.authorsRepository.findOne({ where: { id } });

    if (!findAuthor) {
      throw new NotFoundException('Author not found');
    }

    const deleteAuthor = await this.authorsRepository.delete({ id });

    return deleteAuthor;
  }

  async softDelete(id: number): Promise<AuthorEntity> {
    const author = await this.authorsRepository.findOne({ where: { id } });
    if (!author) {
      throw new NotFoundException('Author not found');
    }
    author.deletedAt = new Date(); // Marcar o autor como "excluído"
    return await this.authorsRepository.save(author);
  }
}
