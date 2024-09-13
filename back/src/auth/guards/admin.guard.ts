import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
  } from '@nestjs/common';

 
  
  @Injectable()
  export class AdminGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest();
      const user = request.user;
  
    
      if (user && user.roleId === 'cc96c5c2-ce2d-4aab-9c16-ebb12ed6b384') {
        return true;
      } else {
        console.log(user)
        throw new ForbiddenException('Admin role required');
      }
    }
  }