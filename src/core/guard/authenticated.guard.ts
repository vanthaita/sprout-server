import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
  import { Observable } from 'rxjs';

  @Injectable()
  export class AuthenticatedGuard implements CanActivate {
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      const request = context.switchToHttp().getRequest();
      if (!request.isAuthenticated()) {
        throw new UnauthorizedException('User not authenticated');
      }
      return true;
    }
  }

  // Thêm export alias
  export { AuthenticatedGuard as AuthGuard };