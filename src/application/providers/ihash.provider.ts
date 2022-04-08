export interface IHashProvider {
  hash(text: string, salt: number): Promise<string>;
  compare(hash: string, compareText: string): Promise<boolean>;
}
