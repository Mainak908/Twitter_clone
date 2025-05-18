import { S3Client } from "@aws-sdk/client-s3";

import { Redis } from "ioredis";
import { PrismaClient } from "../../generate/client.js";

export const s3Client = new S3Client({
  region: process.env.AWS_DEFAULT_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const redisClient = new Redis(process.env.REDIS_URL!);
export const prismaClient = new PrismaClient();
