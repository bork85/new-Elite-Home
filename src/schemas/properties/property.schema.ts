import z from "zod";

export const createPropertySchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().min(1).max(1000),
  type: z.enum(["APARTMENT", "HOUSE", "TOWNHOUSE", "STUDIO"]).optional(),
  latitude: z.number(),
  longitude: z.number(),
  address: z.string().min(1).max(255),
  total_value: z.number().positive(),
  size: z.number().positive(),
  number_of_rooms: z.number().positive().int(),
  number_of_baths: z.number().positive().int(),
  parking_spaces: z.number().int().min(0),
  tax_value: z.number().positive(),
  condo_value: z.number().positive(),
  are_pets_allowed: z.boolean().optional(),
  is_next_subway: z.boolean().optional(),
  is_furnished: z.boolean().optional(),
  is_active: z.boolean().optional(),
  is_sale: z.boolean().optional(),
  is_rent: z.boolean().optional(),
  ownerId: z.uuid(),
});

export const updatePropertySchema = createPropertySchema.partial();

export const createVisitSchema = z.object({
  visitorName: z.string().min(1).max(255),
  visitorEmail: z.email(),
  visitorPhone: z.string().length(14),
  visitDate: z.coerce.date(),
  visitStatus: z.enum(["PENDING", "SCHEDULED", "REALIZED", "NO_SHOW", "CANCELED"]).optional(),
});

export const updateVisitSchema = z.object({
  id: z.uuid(),
  visitorName: z.string().min(1).max(255).optional(),
  visitorEmail: z.email().optional(),
  visitorPhone: z.string().length(14).optional(),
  visitDate: z.coerce.date().optional(),
  visitStatus: z.enum(["PENDING", "SCHEDULED", "REALIZED", "NO_SHOW", "CANCELED"]).optional(),
  propertyId: z.uuid().optional(),
})

export const getVisitsSchema = z.object({
  id: z.uuid(),
  visitorName: z.string().min(1).max(255),
  visitorEmail: z.email(),
  visitorPhone: z.string().length(14),
  visitDate: z.coerce.date(),
  visitStatus: z.enum(["PENDING", "SCHEDULED", "REALIZED", "NO_SHOW", "CANCELED"]),
  propertyId: z.uuid(),
})