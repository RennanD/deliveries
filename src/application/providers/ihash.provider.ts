export interface IHashProvider {
  hash(text: string, salt: number): Promise<string>;
}
