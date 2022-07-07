import { User } from '@/domain/entities';

export interface IUserRepository{
  create: (data: User) => Promise<{ id: string }>;
  getById: (id: string) => Promise<User>;
  getByEmail: (email: string) => Promise<User | null>;
  delete: (id: string) => Promise<void>;
}
