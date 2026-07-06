import prisma from "../../config/database";
import { AppError } from "../../utils/errors";

class GetAllVisitsService {
  async execute(id: string) {
    const visits = prisma.visits.findMany({
      where: { propertyId: id }
    });
    if(!visits) throw new AppError("Property not found", 404);
    return visits;
  }
}

export default new GetAllVisitsService();
