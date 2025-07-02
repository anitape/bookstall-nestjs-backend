import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private usersOrmRepository: Repository<User>,
  ) {}
  async save(user: User): Promise<User> {
    const result = await this.usersOrmRepository.save(user);

    return result;
  }

  findByEmail(email: string) {
    return this.usersOrmRepository.findOneBy({ email });
  }

  async findByIdOrNotFoundFail(id: number) {
    const result = await this.usersOrmRepository.findOneBy({ id });

    if (!result) {
      throw new NotFoundException('user not found');
    }

    return result;
  }

  findAll() {
    return this.usersOrmRepository.find();
  }
}
