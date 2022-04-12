import bcrypt from 'bcrypt';

import { IHashProvider } from '@application/providers/ihash.provider';

export class BcryptHashAdapter implements IHashProvider {
  async hash(text: string, salt: number): Promise<string> {
    return bcrypt.hashSync(text, salt);
  }

  async compare(compareText: string, hash: string): Promise<boolean> {
    return bcrypt.compareSync(compareText, hash);
  }
}
