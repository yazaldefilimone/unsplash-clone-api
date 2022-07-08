import { HashComparer } from "@/data/protocols/cryptography";
import { IImageRepository, IUserRepository } from "@/data/protocols/repositories";
import { Image } from "@/domain/entities";
import { AlreadyExistsError, InvalidParamError, NotFoundError, UnauthorizedError } from "@/domain/errors";
import { IDeleteImageUseCase } from "@/domain/usecases/image";
import { left, right } from "@/shared/error-handler/either";

export class DeleteImageUseCase implements IDeleteImageUseCase {
  private readonly imageRepository: IImageRepository;
  private readonly userRepository: IUserRepository;
  private readonly hashComparer: HashComparer;

  constructor(
    imageRepository: IImageRepository,
    userRepository: IUserRepository,
    HashComparer: HashComparer
  ) {
    this.imageRepository = imageRepository;
    this.userRepository = userRepository;
    this.hashComparer = HashComparer;
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
    const user = await this.userRepository.getByEmail(data.email);

    if (!user) {
      return left(new NotFoundError("user"));
    }

    const result = await this.hashComparer.compare(data.password, user.password);
    if (!result) {
      return left(new InvalidParamError("password"));
    }

    await this.imageRepository.deleteById(data.id);

    return right(undefined);
  }
}
