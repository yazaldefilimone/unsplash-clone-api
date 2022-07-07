import { Image } from "@/domain/entities";

export interface IImageRepository {
  create: (data: Image) => Promise<{ id: string }>;
  getById: (id: string) => Promise<Image>;
  getByUser: (user_id: string) => Promise<Image[]>;
  deleteById: (id: string) => Promise<void>;
  getAll: (id: string) => Promise<Image[]>;
}
