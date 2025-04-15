import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserCredentialDto } from './dto/user-credential.dto';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async signUp(userCredentialDto: UserCredentialDto): Promise<void> {
    return this.userRepository.createUser(userCredentialDto);
  }
}
