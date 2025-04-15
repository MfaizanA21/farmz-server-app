import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCredentialDto } from './dto/user-credential.dto';
import { LoginDto } from './dto/login-credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() userCredentialDto: UserCredentialDto): Promise<void> {
    return this.authService.signUp(userCredentialDto);
  }

  @Post('/signin')
  signIn(@Body() loginCredentials: LoginDto): Promise<boolean> {
    return this.authService.signIn(loginCredentials);
  }
}
