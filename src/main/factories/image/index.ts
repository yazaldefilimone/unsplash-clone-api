import {
  CreateImageUseCase,
  DeleteImageUseCase,
  FindOneImageUseCase,
  FindUserImageUseCase,
  FindAllImageUseCase,
} from "@/data/usecases/image";
import { ImageRepository } from "@/infrastructure/mongodb/imageRepository";
import {
  CreateImageController,
  DeleteImageController,
  FindOneImageController,
  FindUserImageController,
  FindAllImageController,
} from "@/presentation/controllers/images";

const imageRepository = new ImageRepository();

export const createImageFactory = function () {
  const createImageUseCase = new CreateImageUseCase(imageRepository);
  const createImageController = new CreateImageController(createImageUseCase);
  return createImageController;
};

export const findOneImageFactory = function () {
  const findOneImageUseCase = new FindOneImageUseCase(imageRepository);
  const findOneImageController = new FindOneImageController(findOneImageUseCase);
  return findOneImageController;
};

export const findUserImageFactory = function () {
  const findUserImageUseCase = new FindUserImageUseCase(imageRepository);
  const findUserImageController = new FindUserImageController(findUserImageUseCase);
  return findUserImageController;
};

export const deleteImageFactory = function () {
  const deleteImageUseCase = new DeleteImageUseCase(imageRepository);
  const deleteImageController = new DeleteImageController(deleteImageUseCase);
  return deleteImageController;
};
export const findAllImageFactory = function () {
  const findAllImageUseCase = new FindAllImageUseCase(imageRepository);
  const findAllImageController = new FindAllImageController(findAllImageUseCase);
  return findAllImageController;
};
