import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles =
      this.reflector.get<string[]>('roles', context.getClass()) ||
      this.reflector.get<string[]>('roles', context.getHandler());
    console.log('Roles required for this route:', roles);
    if (!roles) {
      return false;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log('Request user:', request.user);

    return roles.includes(user?.type);
  }
}
