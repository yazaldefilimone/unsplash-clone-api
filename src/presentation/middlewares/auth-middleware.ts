import { ILoadAccountByToken } from "@/domain/usecases/user";
import { Request, Response } from "express";
import { UnexpectedError, AccessDeniedError } from "@/domain/errors";

export class AuthMiddleware {
  private readonly loadAccountByToken: ILoadAccountByToken;

  constructor(loadAccountByToken: ILoadAccountByToken) {
    this.loadAccountByToken = loadAccountByToken;
  }

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { accessToken } = request.body;

      if (accessToken) {
        const account = await this.loadAccountByToken.perform(accessToken);

        if (account.isRight()) {
          return response.status(200).send(account.value);
        }
        return response.status(401).json({ message: account.value.message });
      }

      return response.status(401).json({ message: new AccessDeniedError().message });
    } catch (error) {
      return response.status(401).json({ message: new UnexpectedError().message });
    }
  }
}
