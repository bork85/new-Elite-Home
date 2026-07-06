import prisma from "../../config/database";
import { AppError } from "../../utils/errors";
import type { CreatePropertyInput } from "./CreateProperty.service";

class UpdatePropertyService {
  async execute(id: string, input: Partial<CreatePropertyInput>) {
    const exists = await prisma.property.findUnique({ where: { id } });
    if (!exists) throw new AppError("Property not found", 404);
    return prisma.property.update({ where: { id }, data: input });
  }
}

export default new UpdatePropertyService();
