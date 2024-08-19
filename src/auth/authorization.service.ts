import { Injectable } from '@nestjs/common';
import { ApplicationError } from '../error/application.error';

@Injectable()
export class AuthorizationService {
  verifyUserAuthorization(userId: string | undefined): void {
    if (!userId) {
      throw new ApplicationError('Not authenticated', 401);
    }
  }
}
