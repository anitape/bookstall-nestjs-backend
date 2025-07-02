import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
// LocalStrategy extends Passport's local strategy to handle username/password authentication
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // Configure the strategy to use 'email' as the username field instead of default 'username'
    super({ usernameField: 'email' });
  }

  // The validate method is called automatically by Passport when authenticating a user
  // It receives the username and password submitted by the client
  async validate(username: string, password: string): Promise<any> {
    // Delegate user validation to AuthService (e.g., checking password and user existence)
    const user = await this.authService.validateUser(username, password);
    // If validation succeeds, return the user object, which will be attached to request.user
    // If validation fails, AuthService should throw an exception or return null
    return user;
  }
}
