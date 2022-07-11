import { ISignupUserUseCase } from "@/domain/usecases/user";
import { IUserRepository } from "@/data/protocols/repositories";

import { left, right } from "@/shared/error-handler/either";
import { EmailInUseError, UnexpectedError } from "@/domain/errors";
import { Hasher } from "@/data/protocols/cryptography";
import { User } from "@/domain/entities";

export class SignupUserUseCase implements ISignupUserUseCase {
  private readonly userRepository: IUserRepository;
  private readonly hasher: Hasher;

  constructor(userRepository: IUserRepository, hasher: Hasher) {
    this.userRepository = userRepository;
    this.hasher = hasher;
  }

  async perform(data: ISignupUserUseCase.Input): ISignupUserUseCase.Output {
    try {
      const building = new User().build(data);

      if (building.isLeft()) {
        return left(building.value);
      }

      const user = building.value;

      const isExists = await this.userRepository.getByEmail(user.email);
      if (isExists) {
        return left(new EmailInUseError());
      }

      user.password = await this.hasher.hash(user.password);
      console.log(user);
      const userId = await this.userRepository.create(user);

      return right(userId);
    } catch (error) {
      console.log(error);
      return left(new UnexpectedError());
    }
  }
}
