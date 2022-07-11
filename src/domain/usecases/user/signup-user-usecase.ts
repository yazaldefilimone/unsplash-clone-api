import { userProps } from "@/domain/entities/protocols";
import { EmailInUseError, InvalidParamError, UnexpectedError } from "@/domain/errors";
import { Either } from "@/shared/error-handler/either";

export interface ISignupUserUseCase {
  perform: (data: ISignupUserUseCase.Input) => ISignupUserUseCase.Output;
}

export namespace ISignupUserUseCase {
  export type Input = Omit<userProps, "id">;
  export type Output = Promise<Either<UnexpectedError | InvalidParamError | EmailInUseError, { id: string }>>;
}
