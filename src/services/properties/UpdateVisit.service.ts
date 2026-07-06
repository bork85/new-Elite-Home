import prisma from "../../config/database";
import { AppError } from "../../utils/errors";
import type { CreateVisitInput } from "./CreateVisit.service";

class UpdateVisitService {
  async execute(id: string, input: Partial<CreateVisitInput>) {
    const exists = await prisma.visits.findUnique({ where: { id } });
    if (!exists) throw new AppError("Visit not found", 404);
    return prisma.visits.update({ where: { id }, data: input });
  }
}

export default new UpdateVisitService();
