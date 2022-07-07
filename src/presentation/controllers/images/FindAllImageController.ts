import { IFindAllImageUseCase } from "@/domain/usecases/image";
import { Request, Response } from "express";

export class FindAllImageController {
  private readonly findAllImageUseCase: IFindAllImageUseCase;
  constructor(findAllImageUseCase: IFindAllImageUseCase) {
    this.findAllImageUseCase = findAllImageUseCase;
  }
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const result = await this.findAllImageUseCase.perform();

      if (result.isLeft()) {
        return response.status(400).json({ message: result.value.message });
      }
      return response.status(200).json(result.value);
    } catch (error: any) {
      return response.status(500).json({ message: error.message });
    }
  }
}
