import { IUserRepository } from "@/data/protocols/repositories";
import { userProps } from "@/domain/entities";
import { UserModel } from "@/infrastructure/mongodb/models";

export class UserRepository implements IUserRepository {
  async create(data: userProps): Promise<{ id: string }> {
    const user = await UserModel.create(data);
    return { id: String(user._id) };
  }

  async getById(id: string): Promise<userProps> {
    const user = await UserModel.findById({ _id: id });
    return user as any;
  }

  async getByEmail(email: string): Promise<userProps | null> {
    const user = await UserModel.findOne({ email });
    return user as any;
  }
  async delete(id: string): Promise<void> {
    await UserModel.remove({ _id: id });
  }
}
