import { Image } from "@/domain/entities";
import { UnexpectedError } from "@/domain/errors";
import { Either } from "@/shared/error-handler/either";

export interface IFindAllImageUseCase {
  perform: () => IFindAllImageUseCase.Output;
}
export namespace IFindAllImageUseCase {
  export type Output = Promise<Either<UnexpectedError, Image[]>>;
}
