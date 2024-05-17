import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RentsService } from './rents.service';
import { CreateRentDto } from './dto/create-rent.dto';
import { UpdateRentDto } from './dto/update-rent.dto';

@Controller('rents')
export class RentsController {
  constructor(private readonly rentsService: RentsService) {}

  @Post()
  create(@Body() {pick_up_date, returns_date, user_id, book_id}: CreateRentDto) {
    pick_up_date = new Date();
    returns_date = new Date();
    returns_date.setDate(pick_up_date.getDate() + 7);
    return this.rentsService.create({pick_up_date, returns_date, user_id, book_id});
  }

  @Get()
  findAll() {
    return this.rentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() {pick_up_date, returns_date, user_id, book_id}: UpdateRentDto) {
    pick_up_date = new Date();
    returns_date = new Date();
    returns_date.setDate(pick_up_date.getDate() + 7);
    return this.rentsService.update(+id, {returns_date, user_id, book_id});
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rentsService.remove(+id);
  }
}
