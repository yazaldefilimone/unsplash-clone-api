import { IImageRepository } from "@/data/protocols/repositories";
import { IFindAllImageUseCase } from "@/domain/usecases/image";
import { right } from "@/shared/error-handler/either";

export class FindAllImageUseCase implements IFindAllImageUseCase {
  private readonly imageRepository: IImageRepository;
  constructor(imageRepository: IImageRepository) {
    this.imageRepository = imageRepository;
  }

  async perform(): IFindAllImageUseCase.Output {
    const images = await this.imageRepository.getAll();

    return right(images);
  }
}
