import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto, RegisterDto } from './dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto)
  }

  @Post('/login')
  login(@Body() dto: loginDto) {
    return this.authService.login(dto)
  }

  @Patch('/validate/:token')
  validateAccount(@Param('token') token: string) {
    return this.authService.validateAccount(token);
  }
  
}
