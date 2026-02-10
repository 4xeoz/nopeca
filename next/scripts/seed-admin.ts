/**
 * Seed script to create the super admin account.
 *
 * Usage:
 *   npx tsx scripts/seed-admin.ts
 *
 * This only needs to run once. It creates the super admin if it
 * doesn't already exist, or updates the role if the account exists.
 */

import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const SUPER_ADMIN_EMAIL = "iyad@nopeca.com";
const SUPER_ADMIN_PASSWORD = "nopeca@ceo";
const SUPER_ADMIN_NAME = "Iyad";

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  const hashedPassword = await bcrypt.hash(SUPER_ADMIN_PASSWORD, 12);

  const admin = await prisma.admin.upsert({
    where: { email: SUPER_ADMIN_EMAIL },
    update: { role: "SUPER_ADMIN", password: hashedPassword },
    create: {
      email: SUPER_ADMIN_EMAIL,
      password: hashedPassword,
      name: SUPER_ADMIN_NAME,
      role: "SUPER_ADMIN",
    },
  });

  console.log(`Super admin seeded: ${admin.email} (${admin.role})`);

  await prisma.$disconnect();
  await pool.end();
}

main().catch((e) => {
  console.error("Seed failed:", e);
  process.exit(1);
});
