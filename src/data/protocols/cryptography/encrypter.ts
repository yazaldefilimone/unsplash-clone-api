export interface Encrypter {
  encrypt: (plaintext: { email: string; id: string }) => Promise<string>;
}
