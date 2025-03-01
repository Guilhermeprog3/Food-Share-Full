import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  const donorsData = [
    {
      id: "201",
      name: "Donor 1",
      email: "donor1_new@example.com",
      cnpj: "12345678901234",
      responsible: "Responsible 1",
      password: "password1",
      latitude: -23.55052,
      longitude: -46.633308,
    },
    {
      id: "202",
      name: "Donor 2",
      email: "donor2_new@example.com",
      cnpj: "23456789012345",
      responsible: "Responsible 2",
      password: "password2",
      latitude: -22.906847,
      longitude: -43.172896,
    },
    {
      id: "203",
      name: "Donor 3",
      email: "donor3_new@example.com",
      cnpj: "34567890123456",
      responsible: "Responsible 3",
      password: "password3",
      latitude: -19.916681,
      longitude: -43.934493,
    },
    {
      id: "204",
      name: "Donor 4",
      email: "donor4_new@example.com",
      cnpj: "45678901234567",
      responsible: "Responsible 4",
      password: "password4",
      latitude: -15.7801,
      longitude: -47.9292,
    },
    {
      id: "205",
      name: "Donor 5",
      email: "donor5_new@example.com",
      cnpj: "56789012345678",
      responsible: "Responsible 5",
      password: "password5",
      latitude: -12.9714,
      longitude: -38.5014,
    },
  ];

  for (const donor of donorsData) {
    await prisma.donors.create({
      data: donor,
    });
  }
}

seed()
  .then(() => {
    console.log("Database seeded.");
  })
  .catch((error) => {
    console.error("Error seeding database:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
