-- CreateEnum
CREATE TYPE "TypeProperty" AS ENUM ('APARTMENT', 'HOUSE', 'TOWNHOUSE', 'STUDIO');

-- CreateEnum
CREATE TYPE "VisitStatus" AS ENUM ('PENDING', 'SCHEDULED', 'REALIZED', 'NO_SHOW', 'CANCELED');

-- CreateTable
CREATE TABLE "Property" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "TypeProperty" NOT NULL DEFAULT 'APARTMENT',
    "latitude" DECIMAL(12,8) NOT NULL,
    "longitude" DECIMAL(12,8) NOT NULL,
    "address" TEXT NOT NULL,
    "total_value" DECIMAL(10,2) NOT NULL,
    "size" DECIMAL(10,2) NOT NULL,
    "number_of_rooms" INTEGER NOT NULL,
    "number_of_baths" INTEGER NOT NULL,
    "parking_spaces" INTEGER NOT NULL,
    "tax_value" DECIMAL(10,2) NOT NULL,
    "condo_value" DECIMAL(10,2) NOT NULL,
    "are_pets_allowed" BOOLEAN NOT NULL DEFAULT true,
    "is_next_subway" BOOLEAN NOT NULL DEFAULT false,
    "is_furnished" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_sale" BOOLEAN NOT NULL DEFAULT false,
    "is_rent" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visits" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "visitorName" TEXT NOT NULL,
    "visitorPhone" TEXT NOT NULL,
    "visitorEmail" TEXT NOT NULL,
    "visitDate" TIMESTAMP(3) NOT NULL,
    "visitStatus" "VisitStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Visits_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Visits" ADD CONSTRAINT "Visits_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
