import { IImageRepository } from "@/data/protocols/repositories";
import { Image } from "@/domain/entities";
import { AlreadyExistsError, InvalidParamError, NotFoundError, UnauthorizedError } from "@/domain/errors";
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
    const image = await this.imageRepository.getById(data.id);
    if (!image) {
      return left(new NotFoundError("Image"));
    }
    if (image.userId !== data.id) {
      return left(new UnauthorizedError());
    }
    await this.imageRepository.deleteById(data.id);

    return right(undefined);
  }
}
