import { userProps } from "@/domain/entities/protocols";
import { EmailInUseError, InvalidParamError, NotFoundError, UnexpectedError } from "@/domain/errors";
import { Either } from "@/shared/error-handler/either";

export interface ILoginUserUseCase {
  perform: (data: ILoginUserUseCase.Input) => ILoginUserUseCase.Output;
}

export namespace ILoginUserUseCase {
  export type Input = Omit<userProps, "id">;
  export type Output = Promise<
    Either<UnexpectedError | NotFoundError | InvalidParamError, { token: string }>
  >;
}
