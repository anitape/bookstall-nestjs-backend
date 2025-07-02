import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtOptionalGuard extends AuthGuard('jwt') {
    handleRequest(
        err: any, 
        user: any
    ){
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      return null;
    }
    return user;
  }
}