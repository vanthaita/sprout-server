import { Strategy, StrategyOptionsWithRequest } from 'passport-google-oauth20';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../../modules/auth/auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT, 
      clientSecret: process.env.GOOGLE_SECRET, 
      callbackURL: `${process.env.BACKEND_URL}/api/v1/auth/google/callback`, 
      scope: ['email', 'profile'],
      passReqToCallback: false 
    });
  }


  async validate(accessToken: string, refreshToken: string, profile: any) {
    const user = await this.authService.validateOrCreateGoogleUser1({
      email: profile.emails[0].value,
      fullName: profile.displayName,
      googleId: profile.id
    });
    
    if (!user) {
      throw new UnauthorizedException();
    }

    return user; // Trả về user object sẽ được lưu vào req.user
  }
}