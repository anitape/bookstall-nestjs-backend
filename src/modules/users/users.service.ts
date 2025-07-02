import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';
import { RegisterUserDto } from './dto/register-user.dto';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}
  //Registers a new user in the system
  async registerUser(dto: RegisterUserDto): Promise<number> {
    // Hash the plain password securely with bcrypt (10 salt rounds)
    const passwordHash = await bcrypt.hash(dto.password, 10);
    // Create a new User entity and assign properties from DTO
    const user = new User();
    user.age = dto.age;
    user.email = dto.email;
    user.name = dto.name;
    user.passwordHash = passwordHash;

    // Save the user entity to the database
    const createdUser = await this.usersRepository.save(user);
    // Return the generated user ID after successful creation
    return createdUser.id;
  }

  getAllUsers() {
    return this.usersRepository.findAll();
  }
}
