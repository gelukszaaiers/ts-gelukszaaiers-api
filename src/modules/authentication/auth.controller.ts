import { Controller, Get, Post, HttpStatus, Inject, Body, Req } from '@nestjs/common';
import { FacebookDto } from './dto/facebook.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AuthServiceToken') private readonly authService,
    @Inject('authSerializer') private readonly authSerializer
  ) {}
  // @HttpStatus(201)
  @Post('facebook')
  async facebookAuthentication(@Req() req) {
    const tokens = req.user;
    const { identifier } = req.body;
    await this.authService.updateDeviceForUser(req.user.id, identifier, tokens);
    return this.authSerializer.serialize(tokens);
  }

  // @HttpStatus(200)
  @Post('login')
  login() {
    // return this.usersService.findAll();
  }

  @Get('refresh')
  getRefreshToken() {
    // return this.usersService.findAll();
  }
}
