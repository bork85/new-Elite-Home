import prisma from "../../config/database";

class SearchPropertiesService {
  async execute() {
    return prisma.property.findMany();
  }
}

export default new SearchPropertiesService();
