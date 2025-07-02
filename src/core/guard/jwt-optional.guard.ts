import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
// Custom guard extending the default JWT AuthGuard
export class JwtOptionalGuard extends AuthGuard('jwt') {
  // Override handleRequest to customize behavior on authentication failure
    handleRequest(
        err: any, // Error object if authentication failed
        user: any // Authenticated user object if successful
    ){

    // If there is an error or no user is found (unauthenticated),
    // do NOT throw an exception — just return null to allow the request to continue
    if (err || !user) {
      return null;
    }

    // If user is successfully authenticated, return the user object
    return user;
  }
}