import { IImageRepository } from "@/data/protocols/repositories";
import { Image } from "@/domain/entities";
import { AlreadyExistsError, InvalidParamError } from "@/domain/errors";
import { IDeleteImageUseCase } from "@/domain/usecases/image";
import { left, right } from "@/shared/error-handler/either";

export class DeleteImageUseCase implements IDeleteImageUseCase {
  private readonly imageRepository: IImageRepository;
  constructor(imageRepository: IImageRepository) {
    this.imageRepository = imageRepository;
  }

  async perform(data: IDeleteImageUseCase.Input): IDeleteImageUseCase.Output {
    if (!data.id) {
      return left(new InvalidParamError("id"));
    }
    await this.imageRepository.deleteById(data.id);

    return right(undefined);
  }
}
