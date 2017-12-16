import { Controller, Get, Post, HttpStatus, Inject, Body, Req } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('UsersServiceToken') private readonly usersService,
    @Inject('userSerializer') private readonly userSerializer,
    @Inject('UserRepositoryToken') private readonly userRepository,
  ) {}

  // @HttpStatus(201)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return this.userSerializer.serialize(user);
  }

  // @HttpStatus(200)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('current')
  getProfile(@Req() req) {
    return this.userSerializer.serialize(req.user);
  }
}
