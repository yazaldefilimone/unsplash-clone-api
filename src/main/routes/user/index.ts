import { authMiddlewareFactory, loginUserFactory, signupUserFactory } from "@/main/factories/user";
import { Router } from "express";

const userRoutes = Router();

userRoutes.post("/signup", (request, response) => signupUserFactory().handle(request, response));
userRoutes.post("/login", (request, response) => loginUserFactory().handle(request, response));
userRoutes.post("/auth", (request, response) => authMiddlewareFactory().handle(request, response));

export { userRoutes };
