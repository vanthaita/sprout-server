import { Strategy, StrategyOptionsWithRequest } from 'passport-google-oauth20';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../../modules/auth/auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
    const clientID = process.env.GOOGLE_CLIENT;
    const clientSecret = process.env.GOOGLE_SECRET;

    if (!clientID || !clientSecret) {
      throw new UnauthorizedException('Google Client ID or Secret is not configured');
    }

    super({
      clientID,
      clientSecret,
      callbackURL: 'http://localhost:3002/api/v1/auth/google/callback',
      scope: ['email', 'profile'],
      passReqToCallback: true,
    } as StrategyOptionsWithRequest);
  }

  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (err: any, user: any, info?: any) => void,
  ) {
    try {
      const authRes = await this.authService.authenticate(accessToken);
      const user = {
        email: profile.emails[0].value,
        fullName: profile.displayName,
        accessToken,
        access_token: authRes.access_token,
      };
      (request.session as any).user = user;
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  }
}