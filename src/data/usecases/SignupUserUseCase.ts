import { ISignupUserUseCase } from "@/domain/usecases/user";
import { IUserRepository } from "@/data/protocols/repositories";

import { left, right } from "@/shared/error-handler/either";
import { EmailInUseError, UnexpectedError } from "@/domain/errors";
import { Hasher } from "@/data/protocols/cryptography";

export class SignupUserUseCase implements ISignupUserUseCase {
  private readonly userRepository: IUserRepository;
  private readonly hasher: Hasher;

  constructor(userRepository: IUserRepository, hasher: Hasher) {
    this.userRepository = userRepository;
    this.hasher = hasher;
  }

  async perform(data: ISignupUserUseCase.Input): ISignupUserUseCase.Output {
    try {
      const isExists = await this.userRepository.getByEmail(data.email);
      if (isExists) {
        return left(new EmailInUseError());
      }
      console.log({ data });
      console.log({ isExists });
      data.password = await this.hasher.hash(data.password);

      const userId = await this.userRepository.create(data);

      return right(userId);
    } catch (error) {
      console.log(error);
      return left(new UnexpectedError());
    }
  }
}
