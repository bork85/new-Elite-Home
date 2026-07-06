import prisma from "../../config/database";
import { AppError } from "../../utils/errors";

class FindPropertyService {
  async execute(id: string) {
    const property = await prisma.property.findUnique({ where: { id } });
    if (!property) throw new AppError("Property not found", 404);
    return property;
  }
}

export default new FindPropertyService();
