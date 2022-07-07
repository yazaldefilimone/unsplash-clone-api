import {
  createImageFactory,
  deleteImageFactory,
  findAllImageFactory,
  findOneImageFactory,
  findUserImageFactory,
} from "@/main/factories/image";
import { authMiddlewareFactory } from "@/main/factories/user";
import { authUserJwtMiddleware } from "@/presentation/middlewares";
import { Router } from "express";

const imageRoutes = Router();

imageRoutes.post("/create", authUserJwtMiddleware, (request, response) =>
  createImageFactory().handle(request, response)
);
imageRoutes.get("/findId/:id", authUserJwtMiddleware, (request, response) =>
  findOneImageFactory().handle(request, response)
);
imageRoutes.get("/findUser/:userId", (request, response) => findUserImageFactory().handle(request, response));
imageRoutes.get("/all", (request, response) => findAllImageFactory().handle(request, response));
imageRoutes.delete("/delete/:id", authUserJwtMiddleware, (request, response) =>
  deleteImageFactory().handle(request, response)
);

export { imageRoutes };
