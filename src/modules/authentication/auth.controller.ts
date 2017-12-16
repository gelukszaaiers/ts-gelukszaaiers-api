import * as config from 'config';
import { Controller, Get, Post, HttpStatus, Inject, Body, Req } from '@nestjs/common';
import { FacebookDto } from './dto/facebook.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AuthServiceToken') private readonly authService,
    @Inject('authSerializer') private readonly authSerializer,
  ) {}

  @Post('facebook')
  async facebookAuthentication(@Req() req) {
    const tokens = req.user;
    const { identifier } = req.body;
    await this.authService.updateDeviceForUser(req.user.id, identifier, tokens);
    return this.authSerializer.serialize(tokens);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const tokens = await this.authService.validate(loginDto);
    return this.authSerializer.serialize(tokens);
  }

  @Post('refresh')
  async getRefreshToken(@Req() req) {
    const tokens =  await this.authService.refresh(req.body);
    return this.authSerializer.serialize(tokens);
  }
}
