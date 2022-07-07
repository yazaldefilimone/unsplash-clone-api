import { NotFoundError } from "@/domain/errors";
import { Either } from "@/shared/error-handler/either";

export interface ILoadAccountByToken {
  perform: (accessToken: string) => ILoadAccountByToken.Output;
}

export namespace ILoadAccountByToken {
  export type Output = Promise<Either<NotFoundError, { id: string }>>;
}
