import { Image } from "@/domain/entities";
import { InvalidParamError, NotFoundError, UnexpectedError } from "@/domain/errors";
import { Either } from "@/shared/error-handler/either";

export interface IFindOneImageUseCase {
  perform: (data: IFindOneImageUseCase.Input) => IFindOneImageUseCase.Output;
}
export namespace IFindOneImageUseCase {
  export type Input = { id: string };
  export type Output = Promise<Either<UnexpectedError | InvalidParamError | NotFoundError, Image>>;
}
