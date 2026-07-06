import { FastifyRequest, FastifyReply } from "fastify";
import { AppError } from "../../utils/errors";
import CreatePropertyService from "../../services/properties/CreateProperty.service";
import FindPropertyService from "../../services/properties/FindProperty.service";
import SearchPropertiesService from "../../services/properties/SearchProperties.service";
import UpdatePropertyService from "../../services/properties/UpdateProperty.service";
import CreateVisitService from "../../services/properties/CreateVisit.service";
import UpdateVisitService from "../../services/properties/UpdateVisit.service";
import { createPropertySchema, updatePropertySchema, createVisitSchema, updateVisitSchema, getVisitsSchema } from "../../schemas/properties/property.schema";
import GetAllVisitsService from "../../services/properties/GetAllVisits.service";

export async function createProperty(req: FastifyRequest, reply: FastifyReply) {
  const data = createPropertySchema.parse(req.body);
  const property = await CreatePropertyService.execute(data);
  return reply.status(201).send({ property });
}

export async function findProperty(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: string };
  const property = await FindPropertyService.execute(id);
  return reply.status(200).send({ property });
}

export async function searchProperties(_req: FastifyRequest, reply: FastifyReply) {
  const properties = await SearchPropertiesService.execute();
  return reply.status(200).send({ properties });
}

export async function updateProperty(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: string };
  const data = updatePropertySchema.parse(req.body);
  const property = await FindPropertyService.execute(id);
  if (property.ownerId !== req.user?.id) throw new AppError("Unauthorized", 403);
  const updated = await UpdatePropertyService.execute(id, data);
  return reply.status(200).send({ property: updated });
}

export async function createVisit(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: string };
  const data = createVisitSchema.parse(req.body);
  const visit = await CreateVisitService.execute({ ...data, propertyId: id });
  return reply.status(201).send({ visit });
}

export async function updateVisit(req: FastifyRequest, reply: FastifyReply) {
  const data = updateVisitSchema.parse(req.body);
  const id = data.id;
  const visit = await UpdateVisitService.execute(id, data);
  return reply.status(200).send({ visit });
}

export async function getAllVisits(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: string };
  const property = await FindPropertyService.execute(id);
  if(!property) return reply.status(400).send({ error: 'Property not found.' });
  if (property.ownerId !== req.user?.id && req.user?.role !== "ADMIN") throw new AppError("Unauthorized", 403);
  //const { propertyId } = getVisitsSchema.parse(req.body);
  const visits = await GetAllVisitsService.execute(property.id);
  return reply.status(200).send({ visits });
}