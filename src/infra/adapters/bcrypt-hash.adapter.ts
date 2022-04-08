import bcrypt from 'bcrypt';

import { IHashProvider } from '@application/providers/ihash.provider';

export class BcryptHashAdapter implements IHashProvider {
  async hash(text: string, salt: number): Promise<string> {
    return bcrypt.hashSync(text, salt);
  }
}
