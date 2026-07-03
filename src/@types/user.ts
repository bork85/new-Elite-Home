import { UserRole } from "../generated/prisma/enums";

export interface UserPayload {
  id: string;
  role: UserRole;
}
