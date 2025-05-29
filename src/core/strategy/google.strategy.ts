/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { ApiHideProperty } from '@nestjs/swagger';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: `${process.env.WEB_URL}/api/v1/auth/google/callback`,
      scope: ['email', 'profile'],
    });
  }

  @ApiHideProperty()
  authorizationParams(): { [key: string]: string } {
    return {
      access_type: 'offline',
      prompt: 'consent',
    };
  }

  async validate(access_token: string) {
    const user = {
      accessToken: access_token,
    };
    return user || null;
  }
}