import { ILoginUserUseCase } from "@/domain/usecases/user";
import { Request, Response } from "express";

export class LoginUserController {
  private readonly loginUserUseCase: ILoginUserUseCase;
  constructor(loginUserUseCase: ILoginUserUseCase) {
    this.loginUserUseCase = loginUserUseCase;
  }
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { body } = request;
      console.log({ body });
      const result = await this.loginUserUseCase.perform(body);

      if (result.isLeft()) {
        return response.status(400).json({ message: result.value.message });
      }
      return response.status(200).send(result.value);
    } catch (error: any) {
      return response.status(500).json({ message: error.message });
    }
  }
}
