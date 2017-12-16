import { Controller, Get, Post, HttpStatus, Inject } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('authServiceToken') private readonly usersService
  ) {}

  // @HttpStatus(201)
  @Post('facebook')
  facebookAuthentication() {
    // TODO: Add some logic here
  }

  // @HttpStatus(200)
  @Post('login')
  login() {
    return this.usersService.findAll();
  }

  @Get('refresh')
  getRefreshToken() {
    return this.usersService.findAll();
  }
}
