import { Decrypter } from "@/data/protocols/cryptography";
import { IUserRepository } from "@/data/protocols/repositories";
import { NotFoundError } from "@/domain/errors";
import { ILoadAccountByToken } from "@/domain/usecases/user";
import { left, right } from "@/shared/error-handler/either";
export class LoadAccountByToken implements ILoadAccountByToken {
  private readonly dencrypter: Decrypter;
  private readonly userRepository: IUserRepository;
  constructor(dencrypter: Decrypter, userRepository: IUserRepository) {
    this.dencrypter = dencrypter;
    this.userRepository = userRepository;
  }
  async perform(accessToken: string): ILoadAccountByToken.Output {
    const result = await this.dencrypter.decrypt(accessToken);

    const userEmail = await this.userRepository.getByEmail(result.email);
    const userId = await this.userRepository.getById(result.id);

    if (!userEmail || !userId) {
      return left(new NotFoundError("user"));
    }

    return right({ id: result.id as string });
  }
}
