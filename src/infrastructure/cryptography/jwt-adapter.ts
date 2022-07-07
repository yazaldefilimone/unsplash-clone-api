import { Encrypter, Decrypter } from '@/data/protocols/cryptography';

import jwt from 'jsonwebtoken';

export class JwtAdapter implements Encrypter, Decrypter {
  constructor(private readonly secret: string) {}

  async encrypt(plaintext: { email: string; id: string }): Promise<string> {
    return jwt.sign(plaintext, this.secret);
  }

  async decrypt(ciphertext: string): Promise<{ email: string; id: string }> {
    return jwt.verify(ciphertext, this.secret) as any;
  }
}
