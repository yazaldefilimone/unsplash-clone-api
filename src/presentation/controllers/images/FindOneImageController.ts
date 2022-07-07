import { IFindOneImageUseCase } from "@/domain/usecases/image";
import { Request, Response } from "express";

export class FindOneImageController {
  private readonly findOneImageUseCase: IFindOneImageUseCase;
  constructor(findOneImageUseCase: IFindOneImageUseCase) {
    this.findOneImageUseCase = findOneImageUseCase;
  }
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const data: any = request.params;
      const result = await this.findOneImageUseCase.perform(data);

      if (result.isLeft()) {
        return response.status(400).json({ message: result.value.message });
      }
      return response.status(200).json(result.value);
    } catch (error: any) {
      return response.status(500).json({ message: error.message });
    }
  }
}
