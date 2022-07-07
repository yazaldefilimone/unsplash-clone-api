import { ILoginUserUseCase } from '@/domain/usecases/user';
import { IUserRepository } from '@/data/protocols/repositories';

import { left, right } from '@/shared/error-handler/either';
import { NotFoundError, UnexpectedError } from '@/domain/errors';
import { Encrypter, HashComparer } from '@/data/protocols/cryptography';
import { InvalidParamError } from '@/domain/errors/invalid-param-error';

export class LoginUserUseCase implements ILoginUserUseCase {
  private readonly userRepository: IUserRepository;
  private readonly encrypter: Encrypter;
  private readonly hashComparer: HashComparer;

  constructor(userRepository: IUserRepository, encrypter: Encrypter, HashComparer: HashComparer) {
    this.userRepository = userRepository;
    this.encrypter = encrypter;
    this.hashComparer = HashComparer;
  }

  async perform(data: ILoginUserUseCase.Input): ILoginUserUseCase.Output {
    try {
      const isExists = await this.userRepository.getByEmail(data.email);
      if (!isExists) {
        return left(new NotFoundError('user'));
      }

      const result = await this.hashComparer.compare(isExists.password, data.password);

      if (!result) {
        return left(new InvalidParamError('password'));
      }

      const token = await this.encrypter.encrypt({ email: isExists.email, id: isExists.id as string });

      return right({ token });
    } catch (error) {
      return left(new UnexpectedError());
    }
  }
}
