import { SignupUserUseCase } from "@/data/usecases";
import { LoginUserUseCase } from "@/data/usecases/LoginUserUseCase";
import { BcryptAdapter, JwtAdapter } from "@/infrastructure/cryptography";
import { UserRepository } from "@/infrastructure/mongodb";
import { SignupUserController } from "@/presentation/controllers/user";
import { LoginUserController } from "@/presentation/controllers/user/LoginUserController";
import { env } from "@/shared/env";

const secret = env.secret;
const jwtAdapter = new JwtAdapter(secret.key);

const bcryptAdapter = new BcryptAdapter();
const userRepository = new UserRepository();

export const loginUserFactory = function () {
  const loginUserUseCase = new LoginUserUseCase(userRepository, jwtAdapter, bcryptAdapter);

  const loginUserController = new LoginUserController(loginUserUseCase);
  return loginUserController;
};
export const signupUserFactory = function () {
  const loginUserUseCase = new SignupUserUseCase(userRepository, bcryptAdapter);

  const loginUserController = new SignupUserController(loginUserUseCase);
  return loginUserController;
};
