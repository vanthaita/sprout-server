import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtAuthGuard } from '../../modules/auth/jwt-auth.guard';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private jwtAuthGuard: JwtAuthGuard) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      await this.jwtAuthGuard.canActivate(context);
      return true;
    } catch (error) {
      throw new UnauthorizedException('User not authenticated');
    }
  }
}

export { AuthenticatedGuard as AuthGuard };