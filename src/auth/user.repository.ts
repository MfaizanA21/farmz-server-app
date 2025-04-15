import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { UserCredentialDto } from './dto/user-credential.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(userCredentialDto: UserCredentialDto): Promise<void> {
    const { firstname, lastname, email, password } = userCredentialDto;
    const user = this.create({
      firstname,
      lastname,
      email,
      password,
    });
    try {
      await this.save(user);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
