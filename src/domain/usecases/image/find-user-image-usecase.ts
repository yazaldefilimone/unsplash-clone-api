import { Image } from "@/domain/entities";
import { InvalidParamError, NotFoundError, UnexpectedError } from "@/domain/errors";
import { Either } from "@/shared/error-handler/either";

export interface IFindUserImageUseCase {
  perform: (data: IFindUserImageUseCase.Input) => IFindUserImageUseCase.Output;
}
export namespace IFindUserImageUseCase {
  export type Input = { userId: string };
  export type Output = Promise<Either<UnexpectedError | InvalidParamError | NotFoundError, Image[]>>;
}
