import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { JwtService } from '@nestjs/jwt';
import { CryptoService } from './crypto.service';

@Injectable()
// AuthService handles user authentication and JWT token generation
export class AuthService {
    constructor(private userRepository: UsersRepository, private jwtService: JwtService, private CryptoService: CryptoService) {

    }

    // Validate a user's credentials during login
    async validateUser(email: string, password: string) {
        const user = await this.userRepository.findByEmail(email);

        // If user is not found, throw UnauthorizedException
        if (!user) {
            throw new UnauthorizedException();
        }

        // Compare the provided password with the stored password hash using bcrypt
        const isValid = await this.CryptoService.compare(password, user.passwordHash);

        // If password does not match, throw UnauthorizedException
        if (!isValid) {
            throw new  UnauthorizedException();
        }

        return {
            userId: user.id
        }
    }
        // Generate a JWT access token for a validated user
        login(userId: string) {
            // Sign a new JWT token embedding the userId
            const token = this.jwtService.sign( { userId } );

            return {
                accessToken: token
            }
        }
    }
