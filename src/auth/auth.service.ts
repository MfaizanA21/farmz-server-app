import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserCredentialDto } from './dto/user-credential.dto';
import { LoginDto } from './dto/login-credential.dto';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async signUp(userCredentialDto: UserCredentialDto): Promise<void> {
    return this.userRepository.createUser(userCredentialDto);
  }

  async signIn(loginDto: LoginDto): Promise<boolean> {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (user && user.password === password) {
      return true;
    } else {
      return false;
    }
  }
}
