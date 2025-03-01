-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDENTE', 'CANCELADA', 'ENTREGUE');

-- CreateTable
CREATE TABLE "Donors" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "responsible" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,

    CONSTRAINT "Donors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Foods" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "expiration_time" TIMESTAMP(3) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "donor_id" TEXT NOT NULL,

    CONSTRAINT "Foods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vulnerables" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,

    CONSTRAINT "Vulnerables_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservations" (
    "id" TEXT NOT NULL,
    "vulnerable_id" TEXT NOT NULL,
    "food_id" TEXT NOT NULL,
    "food_quantity" INTEGER NOT NULL DEFAULT 1,
    "status" "Status" NOT NULL DEFAULT 'PENDENTE',
    "pickup_date" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "token_used" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Reservations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Donors_email_key" ON "Donors"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Vulnerables_email_key" ON "Vulnerables"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Vulnerables_cpf_key" ON "Vulnerables"("cpf");

-- AddForeignKey
ALTER TABLE "Foods" ADD CONSTRAINT "Foods_donor_id_fkey" FOREIGN KEY ("donor_id") REFERENCES "Donors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservations" ADD CONSTRAINT "Reservations_vulnerable_id_fkey" FOREIGN KEY ("vulnerable_id") REFERENCES "Vulnerables"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservations" ADD CONSTRAINT "Reservations_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "Foods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
