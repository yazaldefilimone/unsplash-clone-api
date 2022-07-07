import { IImageRepository } from "@/data/protocols/repositories";
import { Image } from "@/domain/entities";
import { AlreadyExistsError, InvalidParamError } from "@/domain/errors";
import { IFindUserImageUseCase } from "@/domain/usecases/image";
import { left, right } from "@/shared/error-handler/either";

export class FindUserImageUseCase implements IFindUserImageUseCase {
  private readonly imageRepository: IImageRepository;
  constructor(imageRepository: IImageRepository) {
    this.imageRepository = imageRepository;
  }

  async perform(data: IFindUserImageUseCase.Input): IFindUserImageUseCase.Output {
    if (!data.userId) {
      return left(new InvalidParamError("user id"));
    }
    const images = await this.imageRepository.getByUser(data.userId);

    return right(images);
  }
}
