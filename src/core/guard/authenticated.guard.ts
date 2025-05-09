import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from '../../modules/auth/jwt-auth.guard';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private jwtAuthGuard: JwtAuthGuard) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // Kiểm tra session trước
    if (request.isAuthenticated()) {
      return true;
    }

    // Nếu không có session, thử xác thực bằng JWT
    try {
      await this.jwtAuthGuard.canActivate(context);
      return true;
    } catch (error) {
      throw new UnauthorizedException('User not authenticated');
    }
  }
}

// Thêm export alias
export { AuthenticatedGuard as AuthGuard };