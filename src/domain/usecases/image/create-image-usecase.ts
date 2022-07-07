import { Image } from "@/domain/entities";
import { AlreadyExistsError, InvalidParamError, UnexpectedError } from "@/domain/errors";
import { Either } from "@/shared/error-handler/either";

export interface ICreateImageUseCase {
  perform: (data: ICreateImageUseCase.Input) => ICreateImageUseCase.Output;
}
export namespace ICreateImageUseCase {
  export type Input = Image;
  export type Output = Promise<
    Either<UnexpectedError | InvalidParamError | AlreadyExistsError, { id: string }>
  >;
}
