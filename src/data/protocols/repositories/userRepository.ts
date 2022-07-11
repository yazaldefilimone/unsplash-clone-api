import { userProps } from "@/domain/entities/protocols";

export interface IUserRepository {
  create: (data: userProps) => Promise<{ id: string }>;
  getById: (id: string) => Promise<userProps>;
  getByEmail: (email: string) => Promise<userProps | null>;
  delete: (id: string) => Promise<void>;
}
