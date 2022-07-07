import { ISignupUserUseCase } from "@/domain/usecases/user";
import { Request, response, Response } from "express";

export class SignupUserController {
  private readonly signupUserUseCase: ISignupUserUseCase;
  constructor(signupUserUseCase: ISignupUserUseCase) {
    this.signupUserUseCase = signupUserUseCase;
  }
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { body } = request;
      console.log({ body });
      const result = await this.signupUserUseCase.perform(body);

      if (result.isLeft()) {
        return response.status(400).json({ message: result.value.message });
      }
      return response.status(201).send(result.value);
    } catch (error: any) {
      return response.status(500).json({ message: error.message });
    }
  }
}
