import { IDeleteImageUseCase } from "@/domain/usecases/image";
import { Request, Response } from "express";

export class DeleteImageController {
  private readonly deleteImageUseCase: IDeleteImageUseCase;
  constructor(deleteImageUseCase: IDeleteImageUseCase) {
    this.deleteImageUseCase = deleteImageUseCase;
  }
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { body } = request;
      const result = await this.deleteImageUseCase.perform({ ...body, email: request.userEmail });

      if (result.isLeft()) {
        return response.status(400).json({ message: result.value.message });
      }
      return response.status(200).send();
    } catch (error: any) {
      return response.status(500).json({ message: error.message });
    }
  }
}
