export interface IPayload {
  username: string;
}

export interface IJWTProvider {
  sign(payload: IPayload, subject: string): Promise<string>;
}
