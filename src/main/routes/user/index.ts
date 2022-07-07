import { loginUserFactory } from "@/main/factories/user/loginUserfactory";
import { Router } from "express";

const userRoutes = Router();

userRoutes.post("/signup", (request, response) =>
  loginUserFactory().handle(request, response)
);

export { userRoutes };
