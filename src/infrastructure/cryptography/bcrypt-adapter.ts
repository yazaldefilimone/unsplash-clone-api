import { Hasher, HashComparer } from "@/data/protocols/cryptography";

import bcrypt from "bcryptjs";

export class BcryptAdapter implements Hasher, HashComparer {
  private readonly salt: number | string;
  constructor() {
    this.salt = 8;
  }

  async hash(plaintext: string): Promise<string> {
    return await bcrypt.hash(plaintext, this.salt);
  }

  async compare(plaintext: string, digest: string): Promise<boolean> {
    return await bcrypt.compare(plaintext, digest);
  }
}
