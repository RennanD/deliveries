import { IJWTProvider, IPayload } from '@application/providers/ijwt.provider';

import { sign } from 'jsonwebtoken';
import jwtConfig from 'src/config/jwt';

export class JsonWebTokenAdapter implements IJWTProvider {
  async sign(payload: IPayload, subject: string): Promise<string> {
    return sign(payload, jwtConfig.secret, {
      subject,
      expiresIn: jwtConfig.expiresIn,
    });
  }
}
