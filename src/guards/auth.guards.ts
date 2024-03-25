import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { GoogleService } from 'src/configurations/google-api/google.service';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private moduleRef: ModuleRef) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken = request.headers.authorization;

    if (!accessToken) {
      throw new UnauthorizedException('Your are unauthorized');
    }
    const googleService = this.moduleRef.get(GoogleService, { strict: false });
    const email = await googleService.getProfile(accessToken);
    if (!email) {
      throw new UnauthorizedException('Your are unauthorized, Sign in again');
    }
    return true;
  }
}
