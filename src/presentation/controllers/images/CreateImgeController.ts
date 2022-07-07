import { ICreateImageUseCase } from "@/domain/usecases/image";
import { Request, Response } from "express";

export class CreateImageController {
  private readonly createImageUseCase: ICreateImageUseCase;
  constructor(createImageUseCase: ICreateImageUseCase) {
    this.createImageUseCase = createImageUseCase;
  }
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { body } = request;
      const payload = {
        ...body,
        userId: request.userId,
      };
      const result = await this.createImageUseCase.perform(payload);

      if (result.isLeft()) {
        return response.status(400).json({ message: result.value.message });
      }
      return response.status(201).json(result.value);
    } catch (error: any) {
      return response.status(500).json({ message: error.message });
    }
  }
}
