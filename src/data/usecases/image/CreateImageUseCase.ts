import { IImageRepository } from "@/data/protocols/repositories";
import { Image } from "@/domain/entities";
import { AlreadyExistsError } from "@/domain/errors";
import { ICreateImageUseCase } from "@/domain/usecases/image";
import { left, right } from "@/shared/error-handler/either";

export class CreateImageUseCase implements ICreateImageUseCase {
  private readonly imageRepository: IImageRepository;
  constructor(imageRepository: IImageRepository) {
    this.imageRepository = imageRepository;
  }

  async perform(data: ICreateImageUseCase.Input): ICreateImageUseCase.Output {
    const images = await this.imageRepository.getByUser(data.userId);

    if (images.length > 0) {
      const isExists = images.find((img) => img.url === data.url);

      if (isExists) {
        return left(new AlreadyExistsError("Image"));
      }
    }

    const result = await this.imageRepository.create(data);

    return right(result);
  }
}
