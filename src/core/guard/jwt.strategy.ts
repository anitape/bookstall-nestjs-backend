import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
// JwtStrategy extends Passport's JWT Strategy to handle JWT validation
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    // Call the parent constructor with JWT options
    super({
      // Extract JWT from the Authorization header as Bearer token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Do not ignore token expiration; expired tokens will be rejected
      ignoreExpiration: false,
      // Secret key used to verify the JWT signature
      secretOrKey: 'secret_key',
    });
  }

  // Validate is called automatically by Passport after verifying token signature
  // The payload parameter contains the decoded JWT payload
  async validate(payload: any) {

    // Return an object that will be attached to the request.user
    // Here, userId from the payload is forwarded for further use
    return { userId: payload.userId };
  }
}
