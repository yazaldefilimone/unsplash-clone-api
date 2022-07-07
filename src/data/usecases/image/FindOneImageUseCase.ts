import { IImageRepository } from "@/data/protocols/repositories";
import { InvalidParamError } from "@/domain/errors";
import { IFindOneImageUseCase } from "@/domain/usecases/image";
import { left, right } from "@/shared/error-handler/either";

export class FindOneImageUseCase implements IFindOneImageUseCase {
  private readonly imageRepository: IImageRepository;
  constructor(imageRepository: IImageRepository) {
    this.imageRepository = imageRepository;
  }

  async perform(data: IFindOneImageUseCase.Input): IFindOneImageUseCase.Output {
    if (!data.id) {
      return left(new InvalidParamError("id"));
    }
    const images = await this.imageRepository.getById(data.id);

    return right(images);
  }
}
