import fs from "fs";
import path from "path";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const globalForPrisma = globalThis as unknown as {
  prisma: InstanceType<typeof PrismaClient>;
};

function getDbPath(): string {
  // In production (Vercel serverless), copy the bundled dev.db to /tmp
  if (process.env.VERCEL || process.env.NODE_ENV === "production") {
    const tmpDb = "/tmp/dev.db";
    if (!fs.existsSync(tmpDb)) {
      const srcDb = path.join(process.cwd(), "dev.db");
      if (fs.existsSync(srcDb)) {
        fs.copyFileSync(srcDb, tmpDb);
      }
    }
    return tmpDb;
  }
  return path.join(process.cwd(), "dev.db");
}

function createPrismaClient(): InstanceType<typeof PrismaClient> {
  const dbPath = getDbPath();
  const adapter = new PrismaBetterSqlite3({
    url: `file:${dbPath}`,
  });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
