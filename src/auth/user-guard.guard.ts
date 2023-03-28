import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserDocument } from '../users/user.schema';

@Injectable()
export class UserGuardGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user as UserDocument | undefined;

    return !!user;
  }
}
