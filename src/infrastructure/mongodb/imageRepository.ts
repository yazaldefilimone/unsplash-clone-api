import { IImageRepository } from "@/data/protocols/repositories";
import { Image } from "@/domain/entities";
import { imageModel } from "@/infrastructure/mongodb/models";

export class ImageRepository implements IImageRepository {
  async deleteById(id: string): Promise<void> {
    await imageModel.remove({ _id: id });
  }

  async getAll(): Promise<Image[]> {
    const images = await imageModel.find({});
    return images as any;
  }
  async create(data: Image): Promise<{ id: string }> {
    const image = await imageModel.create(data);
    return { id: String(image._id) };
  }

  async getById(id: string): Promise<Image> {
    const image = await imageModel.findById({ _id: id });
    return image as any;
  }

  async getByUser(user_id: string): Promise<Image[]> {
    const image = await imageModel.find({ user_id });
    return image as any;
  }
  async delete(id: string): Promise<void> {
    await imageModel.remove({ _id: id });
  }
}
