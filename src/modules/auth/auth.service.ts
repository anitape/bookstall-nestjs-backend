import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userRepository: UsersRepository, private jwtService: JwtService) {

    }
    async validateUser(email: string, password: string) {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new UnauthorizedException();
        }

        const isValid = await bcrypt.compare(password, user.passwordHash);

        if (!isValid) {
            throw new  UnauthorizedException();
        }

        return {
            userId: user.id
        }
    }

        login(userId: string) {

            const token = this.jwtService.sign( { userId } );

            return {
                accessToken: token
            }
        }
    }
