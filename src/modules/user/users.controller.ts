import { Controller, Get, Post, HttpStatus, Inject } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('UsersServiceToken') private readonly usersService
  ) {}

  // @HttpStatus(201)
  @Post()
  create() {
    // TODO: Add some logic here
  }

  // @HttpStatus(200)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
