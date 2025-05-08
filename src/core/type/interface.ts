import { Request as ExpressRequest } from 'express';
import { UserType } from '../../../generated/prisma/client';

export interface AuthenticatedRequest extends ExpressRequest {
  user: {
    userType: UserType;
    accessToken: string;
    email: string;
    id: string;
  };
}