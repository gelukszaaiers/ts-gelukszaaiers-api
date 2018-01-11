import { Controller, Get, Post, Put, HttpCode, Inject, Body, Req } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('UsersServiceToken') private readonly usersService,
    @Inject('userSerializer') private readonly userSerializer,
    @Inject('UserRepositoryToken') private readonly userRepository
  ) {}

  @HttpCode(201)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return this.userSerializer.serialize(user);
  }

  @HttpCode(200)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @HttpCode(200)
  @Get('current')
  getProfile(@Req() req) {
    return this.userSerializer.serialize(req.user);
  }

  @HttpCode(201)
  @Put('current')
  updateProfile(@Req() req) {
    return this.userSerializer.serialize(req.user);
  }

  @HttpCode(201)
  @Post('current/verify')
  verifyUser(@Req() req) {
    return this.userSerializer.serialize(req.user);
  }

  @HttpCode(200)
  @Get('current/avatar')
  getAvatar(@Req() req) {
    return this.userSerializer.serialize(req.user);
  }

  @HttpCode(201)
  @Post('current/avatar')
  updateAvatar(@Req() req) {
    return this.userSerializer.serialize(req.user);
  }
}
