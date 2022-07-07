export interface Decrypter {
  decrypt: (ciphertext: string) => Promise<{ email: string; id: string }>;
}
