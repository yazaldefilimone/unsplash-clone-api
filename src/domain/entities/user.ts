import { Either, left, right } from "@/shared/error-handler/either";

import { isValidEmail, isValidName, isValidPassword } from "@/shared/validators";
import { InvalidParamError } from "@/domain/errors";
import { userProps, ObjectsBuildType, userBuildingResponse } from "./protocols/uerProtocol";

export class User {
  public createName(name: string): Either<InvalidParamError, string> {
    const isValid = isValidName(name);
    return isValid ? right(name) : left(new InvalidParamError(name));
  }

  public createEmail(email: string): Either<InvalidParamError, string> {
    const isValid = isValidEmail(email);
    return isValid ? right(email) : left(new InvalidParamError(email));
  }

  public createPassword(password: string): Either<InvalidParamError, string> {
    const isValid = isValidPassword(password);
    return isValid ? right(password) : left(new InvalidParamError(password));
  }

  public build(data: userProps): userBuildingResponse {
    const objects: ObjectsBuildType = {
      name: this.createName(data.name),
      email: this.createEmail(data.email),
      password: this.createPassword(data.password),
    };

    if (objects.name.isLeft()) {
      return left(new InvalidParamError(data.name));
    }
    if (objects.email.isLeft()) {
      return left(new InvalidParamError(data.email));
    }
    if (objects.password.isLeft()) {
      return left(new InvalidParamError(data.password));
    }

    return right({
      name: objects.name.value as string,
      email: objects.email.value as string,
      password: objects.password.value as string,
    });
  }
}
