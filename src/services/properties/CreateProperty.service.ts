import prisma from "../../config/database";
import { TypeProperty } from "../../generated/prisma/enums";

export interface CreatePropertyInput {
  name: string;
  description: string;
  type?: TypeProperty;
  latitude: number;
  longitude: number;
  address: string;
  total_value: number;
  size: number;
  number_of_rooms: number;
  number_of_baths: number;
  parking_spaces: number;
  tax_value: number;
  condo_value: number;
  are_pets_allowed?: boolean;
  is_next_subway?: boolean;
  is_furnished?: boolean;
  is_active?: boolean;
  is_sale?: boolean;
  is_rent?: boolean;
  ownerId: string;
}

class CreatePropertyService {
  async execute(input: CreatePropertyInput) {
    return prisma.property.create({ data: input });
  }
}

export default new CreatePropertyService();
