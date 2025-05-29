import { Request as ExpressRequest } from 'express';
import { UserType } from 'generated/prisma';
export interface AuthenticatedRequest extends ExpressRequest {
  user: {
    user_type: UserType;
    accessToken: string;
    email: string;
    id: string | number;
    refreshToken: string;
  };
}
