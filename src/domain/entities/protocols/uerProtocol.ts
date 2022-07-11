import { InvalidParamError } from "@/domain/errors";
import { Either } from "@/shared/error-handler/either";

export type ObjectsBuildType = {
  [key: string]: Either<Error, string>;
};

export type userProps = {
  id?: string;
  name: string;
  email: string;
  password: string;
  Images?: Array<String>;
};

export type userBuildingResponse = Either<InvalidParamError, userProps>;
