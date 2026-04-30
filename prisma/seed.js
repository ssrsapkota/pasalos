require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  const existingAdmin = await prisma.user.findUnique({
    where: { email: "admin@pasalos.com" },
  });

  if (existingAdmin) {
    console.log("Super Admin already exists");
    return;
  }

  await prisma.user.create({
    data: {
      name: "Super Admin",
      email: "admin@pasalos.com",
      phone: "9800000000",
      passwordHash: hashedPassword,
      role: "SUPER_ADMIN",
      isActive: true,
    },
  });

  console.log("Super Admin created successfully");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    prisma.$disconnect();
  });