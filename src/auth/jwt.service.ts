import { Injectable, Logger } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  private secret: string;
  private readonly logger = new Logger(JwtService.name);

  constructor() {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined.');
    }
    this.secret = process.env.JWT_SECRET;
  }

  generateToken(payload: object, expiresIn: string = '1h'): string {
    return jwt.sign(payload, this.secret, { expiresIn });
  }

  verifyToken(token: string): any {
    try {
      this.logger.debug(`Verificando o token: ${token}`);
      const decoded = jwt.verify(token, this.secret);
      this.logger.debug(
        `Token decodificado com sucesso: ${JSON.stringify(decoded)}`,
      );
      return decoded;
    } catch (error: any) {
      this.logger.error(`Erro ao verificar o token: ${error.message}`);
      throw error;
    }
  }
}
