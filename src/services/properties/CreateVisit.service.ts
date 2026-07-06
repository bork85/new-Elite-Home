import prisma from "../../config/database";
import { AppError } from "../../utils/errors";
import { VisitStatus } from "../../generated/prisma/enums";

export interface CreateVisitInput {
  visitorName: string;
  visitorEmail: string;
  visitorPhone: string;
  visitDate: Date;
  visitStatus?: VisitStatus;
  propertyId: string;
}

class CreateVisitService {
  async execute(input: CreateVisitInput) {
    const property = await prisma.property.findUnique({ where: { id: input.propertyId } });
    if (!property) throw new AppError("Property not found", 404);
    return prisma.visits.create({ data: input });
  }
}

export default new CreateVisitService();
