import { SignupUserUseCase, LoginUserUseCase, LoadAccountByToken } from "@/data/usecases/user";
import { BcryptAdapter, JwtAdapter } from "@/infrastructure/cryptography";
import { UserRepository } from "@/infrastructure/mongodb";
import { SignupUserController, LoginUserController } from "@/presentation/controllers/user";
import { AuthMiddleware } from "@/presentation/middlewares";
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

export const loadAccountByToken = function () {
  const loadAccountByTokenUseCase = new LoadAccountByToken(jwtAdapter, userRepository);

  const loadAccountByToken = new AuthMiddleware(loadAccountByTokenUseCase);
  return loadAccountByToken;
};

export const authMiddlewareFactory = function () {
  const loadAccountByToken = new LoadAccountByToken(jwtAdapter, userRepository);
  const authMiddleware = new AuthMiddleware(loadAccountByToken);
  return authMiddleware;
};
