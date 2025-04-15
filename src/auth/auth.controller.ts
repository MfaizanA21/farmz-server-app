import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCredentialDto } from './dto/user-credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() userCredentialDto: UserCredentialDto): Promise<void> {
    return this.authService.signUp(userCredentialDto);
  }
}
